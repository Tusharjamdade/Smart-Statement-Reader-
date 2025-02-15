# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import FileResponse, JSONResponse
# import shutil
# import os
# from pathlib import Path
# import pdfplumber
# import fitz  # PyMuPDF
# import cv2
# import numpy as np
# import pytesseract
# import re
# import pandas as pd
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Allow frontend to access backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# UPLOAD_DIR = "uploads"
# OUTPUT_DIR = "output"
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(OUTPUT_DIR, exist_ok=True)

# def is_scanned_pdf(pdf_path):
#     """Check if the PDF is scanned or structured"""
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text = page.extract_text()
#             if text and len(text.strip()) > 10:
#                 return False
#     return True

# def extract_text_from_pdf(pdf_path):
#     """Extract text from structured PDFs"""
#     text_data = []
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text_data.append(page.extract_text())
#     return "\n".join(text_data)

# def extract_text_from_scanned_pdf(pdf_path):
#     """Extract text from scanned PDFs using OCR"""
#     text_data = []
#     doc = fitz.open(pdf_path)
#     for page_num in range(len(doc)):
#         img = doc[page_num].get_pixmap()
#         img_array = np.frombuffer(img.samples, dtype=np.uint8).reshape(img.height, img.width, 3)
#         gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
#         text = pytesseract.image_to_string(gray)
#         text_data.append(text)
#     return "\n".join(text_data)

# def extract_ledger_entries(text):
#     """Extract financial ledger entries using regex"""
#     pattern = re.compile(
#         r'(\d{1,4}[-/.]\d{1,2}[-/.]\d{2,4})\s+([\w\s]+?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)'
#     )
#     transactions = []
#     for match in pattern.findall(text):
#         date, description, amount, balance = match
#         transactions.append({
#             "Date": date,
#             "Description": description.strip(),
#             "Amount": float(amount.replace(",", "")),
#             "Balance": float(balance.replace(",", ""))
#         })
#     return transactions

# def save_to_csv(transactions, output_file):
#     df = pd.DataFrame(transactions)
#     df.to_csv(output_file, index=False)

# def save_to_excel(transactions, output_file):
#     df = pd.DataFrame(transactions)
#     df.to_excel(output_file, index=False, engine='openpyxl')

# def process_pdf(pdf_path, csv_output, excel_output):
#     scanned = is_scanned_pdf(pdf_path)
#     extracted_text = extract_text_from_scanned_pdf(pdf_path) if scanned else extract_text_from_pdf(pdf_path)
#     transactions = extract_ledger_entries(extracted_text)
#     if transactions:
#         save_to_csv(transactions, csv_output)
#         save_to_excel(transactions, excel_output)

# @app.post("/upload")
# def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     csv_output = os.path.join(OUTPUT_DIR, file.filename.replace(".pdf", ".csv"))
#     excel_output = os.path.join(OUTPUT_DIR, file.filename.replace(".pdf", ".xlsx"))

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     process_pdf(file_path, csv_output, excel_output)

#     return JSONResponse({
#         "csv_url": f"/download/{Path(csv_output).name}",
#         "excel_url": f"/download/{Path(excel_output).name}"
#     })

# @app.get("/download/{filename}")
# def download_file(filename: str):
#     file_path = os.path.join(OUTPUT_DIR, filename)
#     if os.path.exists(file_path):
#         return FileResponse(file_path, filename=filename)
#     return JSONResponse({"error": "File not found"}, status_code=404)

# # ✅ NEW ENDPOINT: Extract all text from PDF
# @app.post("/extract-text")
# def extract_text(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)

#     # Save uploaded file
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Check if PDF is scanned or structured
#     scanned = is_scanned_pdf(file_path)

#     # Extract text accordingly
#     extracted_text = extract_text_from_scanned_pdf(file_path) if scanned else extract_text_from_pdf(file_path)

#     return JSONResponse({"text": extracted_text})


from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
import pdfplumber
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_pdf(pdf_path):
    """Extracts text from a structured PDF using pdfplumber"""
    text_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text_data.append(page.extract_text())
    return "\n".join(text_data)

@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    return JSONResponse({"text": extracted_text})
