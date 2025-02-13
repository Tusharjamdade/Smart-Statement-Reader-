// "use client"
// import { useState } from "react";
// import axios from "axios";

// export default function UploadPDF() {
//   const [file, setFile] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:8000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setDownloadUrl(response.data.download_url);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
//         Upload & Process
//       </button>
//       {downloadUrl && (
//         <a href={downloadUrl} className="mt-2 text-blue-600 underline" download>
//           Download Processed File
//         </a>
//       )}
//     </div>
//   );
// }
"use client"
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const [excelUrl, setExcelUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    setCsvUrl(null);
    setExcelUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setCsvUrl(`http://localhost:8000${data.csv_url}`);
      setExcelUrl(`http://localhost:8000${data.excel_url}`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error processing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Upload PDF</h1>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
          disabled={!file || loading}
        >
          {loading ? "Processing..." : "Upload & Convert"}
        </button>

        {csvUrl && excelUrl && (
          <div className="mt-4">
            <p className="text-green-600 font-semibold">Download your files:</p>
            <a href={csvUrl} className="text-blue-500 underline block">Download CSV</a>
            <a href={excelUrl} className="text-blue-500 underline block">Download Excel</a>
          </div>
        )}
      </div>
    </div>
  );
}
