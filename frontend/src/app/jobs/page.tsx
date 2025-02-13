"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFileId(response.data.file_id);
    } catch (err) {
      setError("Failed to upload and process the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Statement Reader</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload PDF"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {fileId && (
        <div>
          <h2>Download Files:</h2>
          <a
            href={`http://localhost:8000/download/${fileId}/csv`}
            download
            style={{ marginRight: "10px" }}
          >
            <button>Download CSV</button>
          </a>
          <a href={`http://localhost:8000/download/${fileId}/xlsx`} download>
            <button>Download Excel</button>
          </a>
        </div>
      )}
    </div>
  );
}