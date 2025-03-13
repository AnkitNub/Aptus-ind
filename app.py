from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

app = Flask(__name__)

SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
CREDENTIALS_FILE = 'credentials.json'  

def get_google_sheet():
    credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, SCOPE)
    client = gspread.authorize(credentials)
     
    spreadsheet = client.open('Aptus Industries Form Responses')
    
    worksheet = spreadsheet.get_worksheet(0)
    
    return worksheet

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        form_data = [
            request.form.get("first_name"),
            request.form.get("last_name"),
            request.form.get("email"),
            request.form.get("phone"),
            request.form.get("company"),
            request.form.get("job_title"),
            request.form.get("subject")
        ]
        
        worksheet = get_google_sheet()
        
        if not worksheet.row_values(1):
            headers = ["First Name", "Last Name", "Email", "Phone", "Company", "Job Title", "Subject", "Timestamp"]
            worksheet.append_row(headers)
        
        from datetime import datetime
        form_data.append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        
        worksheet.append_row(form_data)
        
        return jsonify({"message": "Form submitted successfully!"}), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)