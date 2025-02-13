# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import FileResponse
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

# app = FastAPI()
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

# def process_pdf(pdf_path, output_file):
#     scanned = is_scanned_pdf(pdf_path)
#     extracted_text = extract_text_from_scanned_pdf(pdf_path) if scanned else extract_text_from_pdf(pdf_path)
#     transactions = extract_ledger_entries(extracted_text)
#     if transactions:
#         save_to_csv(transactions, output_file.replace(".xlsx", ".csv"))
#         save_to_excel(transactions, output_file)

# @app.post("/upload")
# def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     output_file_path = os.path.join(OUTPUT_DIR, file.filename.replace(".pdf", ".xlsx"))
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     process_pdf(file_path, output_file_path)
#     return {"download_url": f"/download/{Path(output_file_path).name}"}

# @app.get("/download/{filename}")
# def download_file(filename: str):
#     file_path = os.path.join(OUTPUT_DIR, filename)
#     if os.path.exists(file_path):
#         return FileResponse(file_path, filename=filename, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
#     return {"error": "File not found"}

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


# from fastapi import FastAPI, File, UploadFile, HTTPException, Form
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
# import google.generativeai as genai

# # Initialize FastAPI
# app = FastAPI()

# # Allow frontend to access backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Directories
# UPLOAD_DIR = "uploads"
# OUTPUT_DIR = "output"
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(OUTPUT_DIR, exist_ok=True)

# # Set Gemini API key
# # GEMINI_API_KEY = "AIzaSyAPDV0ILVEzR5n3oIMgDlJu43-BHbYu7HU"
# # genai.configure(api_key=GEMINI_API_KEY)

# # Check if the PDF is scanned or structured
# def is_scanned_pdf(pdf_path):
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text = page.extract_text()
#             if text and len(text.strip()) > 10:
#                 return False
#     return True

# # Extract text from structured PDFs
# def extract_text_from_pdf(pdf_path):
#     text_data = []
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text_data.append(page.extract_text())
#     return "\n".join(text_data)

# # Extract text from scanned PDFs using OCR
# def extract_text_from_scanned_pdf(pdf_path):
#     text_data = []
#     doc = fitz.open(pdf_path)
#     for page_num in range(len(doc)):
#         img = doc[page_num].get_pixmap()
#         img_array = np.frombuffer(img.samples, dtype=np.uint8).reshape(img.height, img.width, 3)
#         gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)
#         text = pytesseract.image_to_string(gray)
#         text_data.append(text)
#     return "\n".join(text_data)

# # Extract financial ledger entries using regex
# def extract_ledger_entries(text):
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

# # Save extracted data to CSV
# def save_to_csv(transactions, output_file):
#     df = pd.DataFrame(transactions)
#     df.to_csv(output_file, index=False)

# # Save extracted data to Excel
# def save_to_excel(transactions, output_file):
#     df = pd.DataFrame(transactions)
#     df.to_excel(output_file, index=False, engine='openpyxl')

# # Process PDF (extract text & financial data)
# def process_pdf(pdf_path, csv_output, excel_output):
#     scanned = is_scanned_pdf(pdf_path)
#     extracted_text = extract_text_from_scanned_pdf(pdf_path) if scanned else extract_text_from_pdf(pdf_path)
#     transactions = extract_ledger_entries(extracted_text)
#     if transactions:
#         save_to_csv(transactions, csv_output)
#         save_to_excel(transactions, excel_output)
#     return extracted_text  # Return extracted text for chat functionality

# # Upload PDF & extract data
# @app.post("/upload")
# def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     csv_output = os.path.join(OUTPUT_DIR, file.filename.replace(".pdf", ".csv"))
#     excel_output = os.path.join(OUTPUT_DIR, file.filename.replace(".pdf", ".xlsx"))

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     extracted_text = process_pdf(file_path, csv_output, excel_output)

#     return JSONResponse({
#         "csv_url": f"/download/{Path(csv_output).name}",
#         "excel_url": f"/download/{Path(excel_output).name}",
#         "text": extracted_text  # Return text for chat
#     })

# # Download extracted CSV/Excel
# @app.get("/download/{filename}")
# def download_file(filename: str):
#     file_path = os.path.join(OUTPUT_DIR, filename)
#     if os.path.exists(file_path):
#         return FileResponse(file_path, filename=filename)
#     return JSONResponse({"error": "File not found"}, status_code=404)

# # Extract full text from uploaded PDF
# @app.post("/extract-text")
# def extract_pdf_text(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
    
#     scanned = is_scanned_pdf(file_path)
#     extracted_text = extract_text_from_scanned_pdf(file_path) if scanned else extract_text_from_pdf(file_path)
#     return JSONResponse({"text": extracted_text})


import os
import pdfplumber
import fitz  # PyMuPDF
import cv2
import numpy as np
import pytesseract
import pandas as pd
import re

# Define directories
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "output"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1️⃣ Detect if PDF is structured or scanned
def is_scanned_pdf(pdf_path):
    """Check if a PDF is scanned or structured."""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text and len(text.strip()) > 5:
                return False  # Structured PDF
    return True  # Scanned PDF

# 2️⃣ Extract text from structured PDFs
def extract_text_from_pdf(pdf_path):
    """Extract text from structured PDFs using pdfplumber."""
    text_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_data.append(text)
    return "\n".join(text_data) if text_data else ""

# 3️⃣ Extract text from scanned PDFs using OCR
def extract_text_from_scanned_pdf(pdf_path):
    """Extract text from scanned PDFs using OCR with preprocessing."""
    text_data = []
    doc = fitz.open(pdf_path)

    for page_num in range(len(doc)):
        img = doc[page_num].get_pixmap()
        img_array = np.frombuffer(img.samples, dtype=np.uint8).reshape(img.height, img.width, 3)
        gray = cv2.cvtColor(img_array, cv2.COLOR_BGR2GRAY)

        # Apply preprocessing for better OCR accuracy
        gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        gray = cv2.medianBlur(gray, 3)

        # Extract text using OCR
        text = pytesseract.image_to_string(gray, config="--psm 6")  
        text_data.append(text.strip())

    return "\n".join(text_data)

# 4️⃣ Extract ledger entries using regex
def extract_ledger_entries(text):
    """Extract financial transactions using regex pattern."""
    pattern = re.compile(
        r'(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\s+([\w\s,.\-&]+?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(-?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)'
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

# 5️⃣ Save extracted data to CSV
def save_to_csv(transactions, output_file):
    """Save extracted financial data to CSV."""
    df = pd.DataFrame(transactions)
    df.to_csv(output_file, index=False)
    print(f"✅ Data saved to {output_file}")

# 6️⃣ Save extracted data to Excel
def save_to_excel(transactions, output_file):
    """Save extracted financial data to Excel."""
    df = pd.DataFrame(transactions)
    df.to_excel(output_file, index=False, engine='openpyxl')
    print(f"✅ Data saved to {output_file}")

# 7️⃣ Process PDF & extract structured financial data
def process_pdf(pdf_path, output_csv, output_excel):
    """Main function to process PDFs and extract financial transactions."""
    scanned = is_scanned_pdf(pdf_path)

    print(f"📄 Processing: {pdf_path}")
    print(f"🔍 Scanned PDF: {scanned}")

    if scanned:
        extracted_text = extract_text_from_scanned_pdf(pdf_path)
    else:
        extracted_text = extract_text_from_pdf(pdf_path)

    print(f"📝 Extracted Text Preview: {extracted_text[:500]}")  # Debugging preview

    transactions = extract_ledger_entries(extracted_text)

    if transactions:
        save_to_csv(transactions, output_csv)
        save_to_excel(transactions, output_excel)
        print(f"✅ Extracted {len(transactions)} transactions.")
    else:
        print("⚠️ No transactions extracted!")

# 8️⃣ Run processing pipeline for a sample file
pdf_file = "Ledger_Entries.pdf"  # Replace with your file
output_csv = "output/extracted_data.csv"
output_excel = "output/extracted_data.xlsx"

process_pdf(pdf_file, output_csv, output_excel)
