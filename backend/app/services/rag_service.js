import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PYTHON_PATH =
  process.env.PYTHON_PATH || "python";

const backendPath = path.resolve(
  __dirname,
  "../../"
);

let pythonWorker = null;
let workerStarted = false;
let workerBuffer = "";

const pendingRequests = new Map();

const startWorker = () => {
  if (
    pythonWorker &&
    !pythonWorker.killed &&
    pythonWorker.exitCode === null
  ) {
    return;
  }

  console.log(
    "Starting persistent Python RAG worker..."
  );

  pythonWorker = spawn(
    PYTHON_PATH,
    [
      "-u",
      "-m",
      "app.rag.rag_worker",
    ],
    {
      cwd: backendPath,
      stdio: [
        "pipe",
        "pipe",
        "pipe",
      ],
      windowsHide: true,
    }
  );

  workerStarted = false;
  workerBuffer = "";

  pythonWorker.stdout.on(
    "data",
    (data) => {
      const text =
        data.toString();

      workerBuffer += text;

      const lines =
        workerBuffer.split("\n");

      workerBuffer =
        lines.pop() || "";

      for (const line of lines) {
        const trimmedLine =
          line.trim();

        if (!trimmedLine) {
          continue;
        }

        console.log(
          "PYTHON STDOUT:",
          trimmedLine
        );

        if (
          trimmedLine ===
          "RAG_WORKER_READY"
        ) {
          workerStarted = true;

          console.log(
            "Persistent Python RAG worker is ready"
          );

          continue;
        }

        if (
          trimmedLine.startsWith(
            "RAG_RESULT:"
          )
        ) {
          handleWorkerResult(
            trimmedLine.substring(
              "RAG_RESULT:".length
            )
          );

          continue;
        }

        if (
          trimmedLine.startsWith(
            "RAG_ERROR:"
          )
        ) {
          handleWorkerError(
            trimmedLine.substring(
              "RAG_ERROR:".length
            )
          );

          continue;
        }
      }
    }
  );

  pythonWorker.stderr.on(
    "data",
    (data) => {
      const text =
        data.toString().trim();

      if (text) {
        console.error(
          "PYTHON STDERR:",
          text
        );
      }
    }
  );

  pythonWorker.on(
    "error",
    (error) => {
      console.error(
        "Python worker error:",
        error
      );

      workerStarted = false;

      rejectAllPending(
        new Error(
          error.message ||
            "Python RAG worker failed"
        )
      );

      pythonWorker = null;
    }
  );

  pythonWorker.on(
    "close",
    (code) => {
      console.log(
        "Python RAG worker closed:",
        code
      );

      workerStarted = false;

      rejectAllPending(
        new Error(
          "Python RAG worker stopped"
        )
      );

      pythonWorker = null;
      workerBuffer = "";
    }
  );
};

const handleWorkerResult = (
  jsonText
) => {
  try {
    const response =
      JSON.parse(jsonText);

    const requestId =
      response.requestId;

    if (!requestId) {
      console.warn(
        "RAG_RESULT received without requestId"
      );

      return;
    }

    const pending =
      pendingRequests.get(
        requestId
      );

    if (!pending) {
      console.warn(
        "No pending request found for:",
        requestId
      );

      return;
    }

    pendingRequests.delete(
      requestId
    );

    pending.resolve(
      response.result
    );
  } catch (error) {
    console.error(
      "Failed to parse worker result:",
      error
    );
  }
};

const handleWorkerError = (
  jsonText
) => {
  try {
    const response =
      JSON.parse(jsonText);

    const requestId =
      response.requestId;

    if (!requestId) {
      console.error(
        "RAG_ERROR received without requestId:",
        response
      );

      return;
    }

    const pending =
      pendingRequests.get(
        requestId
      );

    if (!pending) {
      console.warn(
        "No pending request found for:",
        requestId
      );

      return;
    }

    pendingRequests.delete(
      requestId
    );

    pending.reject(
      new Error(
        response.message ||
          "Python RAG worker error"
      )
    );
  } catch (error) {
    console.error(
      "Failed to parse worker error:",
      error
    );
  }
};

const rejectAllPending = (
  error
) => {
  for (
    const [
      requestId,
      pending,
    ] of pendingRequests.entries()
  ) {
    pending.reject(error);

    pendingRequests.delete(
      requestId
    );
  }
};

const waitForWorker = () => {
  startWorker();

  if (workerStarted) {
    return Promise.resolve();
  }

  return new Promise(
    (resolve, reject) => {
      const timeout =
        setTimeout(() => {
          clearInterval(
            checkWorker
          );

          reject(
            new Error(
              "Python RAG worker startup timeout"
            )
          );
        }, 30000);

      const checkWorker =
        setInterval(() => {
          if (workerStarted) {
            clearInterval(
              checkWorker
            );

            clearTimeout(
              timeout
            );

            resolve();

            return;
          }

          if (
            !pythonWorker ||
            pythonWorker.killed ||
            pythonWorker.exitCode !== null
          ) {
            clearInterval(
              checkWorker
            );

            clearTimeout(
              timeout
            );

            reject(
              new Error(
                "Python RAG worker failed to start"
              )
            );
          }
        }, 50);
    }
  );
};

const sendRequest = async (
  payload
) => {
  await waitForWorker();

  if (
    !pythonWorker ||
    !workerStarted
  ) {
    throw new Error(
      "Python RAG worker is not ready"
    );
  }

  const requestId =
    crypto.randomUUID();

  const request = {
    requestId,
    ...payload,
  };

  return new Promise(
    (resolve, reject) => {
      pendingRequests.set(
        requestId,
        {
          resolve,
          reject,
        }
      );

      try {
        pythonWorker.stdin.write(
          JSON.stringify(
            request
          ) + "\n"
        );
      } catch (error) {
        pendingRequests.delete(
          requestId
        );

        reject(error);
      }
    }
  );
};

export const indexPdf = async ({
  filePath,
  pdfId,
  userId,
  filename,
  technologyId,
  folderId,
}) => {
  return sendRequest({
    action: "index_pdf",
    file_path: filePath,
    pdf_id: pdfId,
    user_id: userId,
    filename,
    technology_id: technologyId,
    folder_id: folderId,
  });
};

export const askQuestion = async ({
  question,
  userId,
  technologyId,
  folderId,
  topK = 5,
}) => {
  return sendRequest({
    action: "ask_question",
    question,
    user_id: userId,
    technology_id: technologyId,
    folder_id: folderId,
    top_k: topK,
  });
};

export const deletePdf = async ({
  pdfId,
}) => {
  const result =
    await sendRequest({
      action: "delete_pdf",
      pdf_id: pdfId,
    });

  return {
    deletedChunks: Number(
      result?.deletedChunks || 0
    ),
  };
};

startWorker();