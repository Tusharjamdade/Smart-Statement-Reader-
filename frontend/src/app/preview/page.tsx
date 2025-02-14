// // import { AccordionDemo } from '@/components/AccordionDemo'
// // import { FAQ } from '@/components/component/faq'
// // import React from 'react'

// // const Page = () => {
// //   return (
// //     <div className=''>
// //     <FAQ/>
// //     </div>
// //   )
// // }

// // export default Page
// // import { useState } from 'react';

// // export default function Home() {
// //   const [file, setFile] = useState(null);
// //   const [downloadLink, setDownloadLink] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     formData.append('file', file);
    
// //     const response = await fetch('http://localhost:8000/upload-pdf/', {
// //       method: 'POST',
// //       body: formData,
// //     });
    
// //     const blob = await response.blob();
// //     const url = window.URL.createObjectURL(blob);
// //     setDownloadLink(url);
// //   };

// //   return (
// //     <div>
// //       <h1>PDF to CSV Converter</h1>
// //       <form onSubmit={handleSubmit}>
// //         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
// //         <button type="submit">Convert</button>
// //       </form>
// //       {downloadLink && (
// //         <a href={downloadLink} download="output.csv">
// //           Download CSV
// //         </a>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [csvData, setCsvData] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a PDF file.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", file);
  
//     console.log("Sending file:", file.name, file.type); // Debug file
  
//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });
  
//       console.log("Raw response:", response); // Log raw response
  
//       const result = await response.json();
//       console.log("Server Response:", result); // Log parsed JSON
  
//       if (!response.ok) {
//         throw new Error(result.message || "Upload failed");
//       }
  
//       setCsvData(result.csvData);
//     } catch (err: any) {
//       console.error("Frontend Error:", err);
//       setError(err.message);
//     }
//   };
  
  

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF</h2>

//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded-md"
//         />

//         <button
//           onClick={handleUpload}
//           className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Upload & Convert"}
//         </button>

//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//         {csvData && (
//           <div className="mt-6 p-4 border rounded bg-gray-50">
//             <h3 className="text-lg font-semibold">Converted CSV:</h3>
//             <pre className="whitespace-pre-wrap text-sm text-gray-800">{csvData}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { usePapaParse } from "react-papaparse";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";

const FilePreviewer = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { readString } = usePapaParse();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handlePreview = () => {
    if (!selectedFile) {
      alert("Please select a file to preview.");
      return;
    }

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (fileExtension === "csv") {
      parseCSV(selectedFile);
    } else if (["xls", "xlsx"].includes(fileExtension)) {
      parseExcel(selectedFile);
    } else {
      alert("Invalid file format! Please upload a CSV or Excel file.");
    }
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      readString(target.result, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.data.length === 0) {
            alert("CSV file is empty!");
            return;
          }
          setHeaders(Object.keys(results.data[0]));
          setTableData(results.data.filter((row) => Object.values(row).some((val) => val !== "")));
        },
        error: (error) => console.error("Error parsing CSV:", error),
      });
    };
    reader.readAsText(file);
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const workbook = XLSX.read(target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        alert("Excel file is empty!");
        return;
      }

      setHeaders(jsonData[0]);
      setTableData(jsonData.slice(1).map((row) => Object.fromEntries(jsonData[0].map((key, i) => [key, row[i]]))));
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col items-center gap-4 p-6 bg-background shadow-lg rounded-lg w-full max-w-md mx-auto">
        <label className="w-full flex items-center justify-center px-4 py-2 bg-muted border border-border rounded-lg shadow-sm cursor-pointer hover:bg-muted/80 transition">
          <Input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileUpload} className="hidden" />
          <span className="text-foreground font-medium flex items-center gap-2">📂 Choose a file</span>
        </label>

        <button
          onClick={handlePreview}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/80 transition"
        >
          👀 Preview
        </button>
      </div>

      {tableData.length > 0 && (
        <div className="overflow-auto max-h-full border rounded-md p-2">
          <table className="w-full border-collapse border border-border">
            <thead className="bg-muted">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border border-border px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-background even:bg-muted/50">
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="border border-border px-4 py-2">{row[header] ?? ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FilePreviewer;
