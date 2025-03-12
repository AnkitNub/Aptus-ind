from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Define the Excel file
EXCEL_FILE = "contact_data.xlsx"

# Ensure Excel file exists
if not os.path.exists(EXCEL_FILE):
    df = pd.DataFrame(columns=["First Name", "Last Name", "Email", "Phone", "Company", "Job Title", "Subject"])
    df.to_excel(EXCEL_FILE, index=False)

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Get form data
        form_data = {
            "First Name": request.form.get("first_name"),
            "Last Name": request.form.get("last_name"),
            "Email": request.form.get("email"),
            "Phone": request.form.get("phone"),
            "Company": request.form.get("company"),
            "Job Title": request.form.get("job_title"),
            "Subject": request.form.get("subject")
        }

        # Read existing data
        df = pd.read_excel(EXCEL_FILE)

        # Append new data
        df = df.append(form_data, ignore_index=True)

        # Save back to Excel
        df.to_excel(EXCEL_FILE, index=False)

        return jsonify({"message": "Form submitted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
