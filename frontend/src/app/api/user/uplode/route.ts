// // import formidable from "formidable";
// // import fs from "fs";
// // import path from "path";
// // import { exec } from "child_process";
// // import { promisify } from "util";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // const processPdf = async (pdfPath) => {
// //   const scriptPath = path.resolve("scripts", "process_pdf.py");
// //   const execPromise = promisify(exec);
// //   try {
// //     const { stdout, stderr } = await execPromise(`python3 ${scriptPath} "${pdfPath}"`);
// //     if (stderr) console.error("Python Error:", stderr);
// //     return stdout.trim();
// //   } catch (error) {
// //     console.error("Execution Error:", error);
// //     return null;
// //   }
// // };

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

// //   const form = new formidable.IncomingForm();
// //   form.uploadDir = "./uploads";
// //   form.keepExtensions = true;

// //   form.parse(req, async (err, fields, files) => {
// //     if (err) return res.status(500).json({ error: "File upload error" });

// //     const pdfPath = files.pdf?.filepath;
// //     if (!pdfPath) return res.status(400).json({ error: "No PDF uploaded" });

// //     const result = await processPdf(pdfPath);
// //     if (!result) return res.status(500).json({ error: "PDF processing failed" });

// //     const outputDir = "./output";
// //     const csvFile = path.join(outputDir, "extracted_data.csv");
// //     const excelFile = path.join(outputDir, "extracted_data.xlsx");

// //     res.status(200).json({ csv: csvFile, excel: excelFile });
// //   });
// // }
// import { exec } from 'child_process';
// import { promisify } from 'util';
// import fs from 'fs';
// import path from 'path';
// import { tmpdir } from 'os';
// import formidable from 'formidable';

// const execAsync = promisify(exec);

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// export default async function handler(req, res) {
//   // Parse uploaded file
//   const form = new formidable.IncomingForm();
//   form.uploadDir = tmpdir();
//   form.keepExtensions = true;

//   const { files } = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ files });
//     });
//   });

//   const pdfFile = files.file;
//   const outputDir = path.join(tmpdir(), `processing_${Date.now()}`);
  
//   try {
//     // Create output directory
//     fs.mkdirSync(outputDir, { recursive: true });

//     // Execute Python script
//     await execAsync(`python process_pdf.py "${pdfFile.filepath}" "${outputDir}"`);

//     // Check output files
//     const csvPath = path.join(outputDir, 'output.csv');
//     const excelPath = path.join(outputDir, 'output.xlsx');
    
//     if (!fs.existsSync(csvPath) || !fs.existsSync(excelPath)) {
//       throw new Error('Processing failed');
//     }

//     // Create zip archive
//     const archiver = require('archiver');
//     const archive = archiver('zip');
    
//     res.setHeader('Content-Type', 'application/zip');
//     res.setHeader('Content-Disposition', 'attachment; filename=output.zip');
    
//     archive.pipe(res);
//     archive.file(csvPath, { name: 'financial_data.csv' });
//     archive.file(excelPath, { name: 'financial_data.xlsx' });
//     await archive.finalize();

//   } catch (error) {
//     console.error('Processing error:', error);
//     res.status(500).json({ error: 'Failed to process PDF' });
//   } finally {
//     // Cleanup temporary files
//     [pdfFile.filepath, outputDir].forEach(p => {
//       if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
//     });
//   }
// }

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import formidable from 'formidable';

const execAsync = promisify(exec);

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  // Parse uploaded file
  const form = new formidable.IncomingForm();
  form.uploadDir = tmpdir();
  form.keepExtensions = true;

  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files });
    });
  });

  const pdfFile = files.file;
  const outputDir = path.join(tmpdir(), `processing_${Date.now()}`);
  
  try {
    // Create output directory
    fs.mkdirSync(outputDir, { recursive: true });

    // Execute Python script
    await execAsync(`python process_pdf.py "${pdfFile.filepath}" "${outputDir}"`);

    // Check output files
    const csvPath = path.join(outputDir, 'output.csv');
    const excelPath = path.join(outputDir, 'output.xlsx');
    
    if (!fs.existsSync(csvPath) || !fs.existsSync(excelPath)) {
      throw new Error('Processing failed');
    }

    // Create zip archive
    const archiver = require('archiver');
    const archive = archiver('zip');
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=output.zip');
    
    archive.pipe(res);
    archive.file(csvPath, { name: 'financial_data.csv' });
    archive.file(excelPath, { name: 'financial_data.xlsx' });
    await archive.finalize();

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  } finally {
    // Cleanup temporary files
    [pdfFile.filepath, outputDir].forEach(p => {
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    });
  }
}