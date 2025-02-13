from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import pdfplumber
import fitz
import cv2
import numpy as np
import pytesseract
import re
import pandas as pd
import os
import uuid

app = FastAPI()

def is_scanned_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text and len(text.strip()) > 10:
                return False
    return True

def extract_text_from_pdf(pdf_path):
    text_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text_data.append(page.extract_text())
    return "\n".join(text_data)

def extract_text_from_scanned_pdf(pdf_path):
    text_data = []
    doc = fitz.open(pdf_path)
    for page_num in range(len(doc)):
        img = doc[page_num].get_pixmap()
        img_array = np.frombuffer(img.samples, dtype=np.uint8).reshape(img.height, img.width, 3)
        gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(gray)
        text_data.append(text)
    return "\n".join(text_data)

def extract_ledger_entries(text):
    pattern = re.compile(
        r'(\d{1,4}[-/.]\d{1,2}[-/.]\d{2,4})\s+([\w\s]+?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)'
    )
    transactions = []
    for match in pattern.findall(text):
        date, description, amount, balance = match
        transactions.append({
            "Date": date,
            "Description": description.strip(),
            "Amount": float(amount.replace(",", "")),
            "Balance": float(balance.replace(",", ""))
        })
    return transactions

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        file_id = str(uuid.uuid4())
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, f"{file_id}.pdf")

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # Process the PDF
        scanned = is_scanned_pdf(file_path)
        extracted_text = extract_text_from_scanned_pdf(file_path) if scanned else extract_text_from_pdf(file_path)
        transactions = extract_ledger_entries(extracted_text)

        if not transactions:
            raise HTTPException(status_code=400, detail="No financial data found in the document.")

        # Save to CSV and Excel
        output_dir = "outputs"
        os.makedirs(output_dir, exist_ok=True)
        csv_path = os.path.join(output_dir, f"{file_id}.csv")
        excel_path = os.path.join(output_dir, f"{file_id}.xlsx")

        df = pd.DataFrame(transactions)
        df.to_csv(csv_path, index=False)
        df.to_excel(excel_path, index=False)

        return {"file_id": file_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{file_id}/{file_type}")
async def download_file(file_id: str, file_type: str):
    file_path = os.path.join("outputs", f"{file_id}.{file_type}")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found.")
    return FileResponse(file_path, filename=f"financial_data.{file_type}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)