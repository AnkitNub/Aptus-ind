from flask import Flask, request, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

app = Flask(__name__)

# Google Sheets API setup
SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
CREDENTIALS_FILE = 'credentials.json'  # You'll need to create this file

# Initialize Google Sheets connection
def get_google_sheet():
    credentials = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, SCOPE)
    client = gspread.authorize(credentials)
    
    # Open the spreadsheet - replace with your spreadsheet name
    spreadsheet = client.open('Aptus Industries Form Responses')
    
    # Get the first worksheet
    worksheet = spreadsheet.get_worksheet(0)
    
    return worksheet

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Get form data
        form_data = [
            request.form.get("first_name"),
            request.form.get("last_name"),
            request.form.get("email"),
            request.form.get("phone"),
            request.form.get("company"),
            request.form.get("job_title"),
            request.form.get("subject")
        ]
        
        # Get the Google Sheet
        worksheet = get_google_sheet()
        
        # Check if headers exist, if not add them
        if not worksheet.row_values(1):
            headers = ["First Name", "Last Name", "Email", "Phone", "Company", "Job Title", "Subject", "Timestamp"]
            worksheet.append_row(headers)
        
        # Add timestamp to the data
        from datetime import datetime
        form_data.append(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        
        # Append the data to the sheet
        worksheet.append_row(form_data)
        
        return jsonify({"message": "Form submitted successfully!"}), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)