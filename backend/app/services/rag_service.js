import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const indexPdf = ({
  filePath,
  pdfId,
  userId,
  filename,
  technologyId,
  folderId,
}) => {
  return new Promise((resolve, reject) => {
    const backendPath = path.resolve(__dirname, "../../");

    const pythonCode = `
import json
from app.rag.rag_engine import index_pdf

result = index_pdf(
    file_path=${JSON.stringify(filePath)},
    pdf_id=${JSON.stringify(pdfId)},
    user_id=${JSON.stringify(userId)},
    filename=${JSON.stringify(filename)},
    technology_id=${JSON.stringify(technologyId)},
    folder_id=${JSON.stringify(folderId)}
)

print("RAG_RESULT:" + json.dumps(result))
`;

    const python = spawn(
      "py",
      ["-c", pythonCode],
      {
        cwd: backendPath,
      }
    );

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("Python RAG Error:");
        console.error(errorOutput);
        console.error("Python Output:");
        console.error(output);

        return reject(
          new Error("RAG indexing failed")
        );
      }

      const marker = "RAG_RESULT:";
      const index = output.lastIndexOf(marker);

      if (index === -1) {
        console.error(output);

        return reject(
          new Error("Invalid RAG engine response")
        );
      }

      const jsonResult = output
        .substring(index + marker.length)
        .trim();

      try {
        resolve(JSON.parse(jsonResult));
      } catch (error) {
        console.error("Invalid RAG JSON:");
        console.error(jsonResult);

        reject(
          new Error("Failed to parse RAG engine response")
        );
      }
    });
  });
};

export const askQuestion = ({
  question,
  userId,
  technologyId,
  folderId,
  topK = 5,
}) => {
  return new Promise((resolve, reject) => {
    const backendPath = path.resolve(__dirname, "../../");

    const pythonCode = `
import json
from app.rag.rag_engine import ask_question

result = ask_question(
    question=${JSON.stringify(question)},
    user_id=${JSON.stringify(userId)},
    technology_id=${JSON.stringify(technologyId)},
    folder_id=${JSON.stringify(folderId)},
    top_k=${topK}
)

print("RAG_RESULT:" + json.dumps(result))
`;

    const python = spawn(
      "py",
      ["-c", pythonCode],
      {
        cwd: backendPath,
      }
    );

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("Python RAG Error:");
        console.error(errorOutput);
        console.error("Python Output:");
        console.error(output);

        return reject(
          new Error("RAG question processing failed")
        );
      }

      const marker = "RAG_RESULT:";
      const index = output.lastIndexOf(marker);

      if (index === -1) {
        console.error("Python Output:");
        console.error(output);

        return reject(
          new Error("Invalid RAG engine response")
        );
      }

      const jsonResult = output
        .substring(index + marker.length)
        .trim();

      try {
        resolve(JSON.parse(jsonResult));
      } catch (error) {
        console.error("Invalid JSON:");
        console.error(jsonResult);

        reject(
          new Error("Failed to parse RAG response")
        );
      }
    });
  });
};

export const deletePdf = ({
  pdfId,
}) => {
  return new Promise((resolve, reject) => {
    const backendPath = path.resolve(__dirname, "../../");

    const pythonCode = `
from app.rag.vector_store import delete_pdf

result = delete_pdf(
    pdf_id=${JSON.stringify(pdfId)}
)

print("RAG_RESULT:" + str(result))
`;

    const python = spawn(
      "py",
      ["-c", pythonCode],
      {
        cwd: backendPath,
      }
    );

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("Python RAG Delete Error:");
        console.error(errorOutput);

        return reject(
          new Error("RAG PDF deletion failed")
        );
      }

      const marker = "RAG_RESULT:";
      const index = output.lastIndexOf(marker);

      if (index === -1) {
        console.error(output);

        return reject(
          new Error("Invalid RAG delete response")
        );
      }

      const result = output
        .substring(index + marker.length)
        .trim();

      resolve({
        deletedChunks: Number(result),
      });
    });
  });
};