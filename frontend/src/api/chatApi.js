import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const askQuestion = async ({
  question,
  technologyId,
  folderId,
  topK = 5,
}) => {
  const response = await fetch(`${API_BASE_URL}/chat/ask`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      question,
      technologyId,
      folderId,
      topK,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate answer"
    );
  }

  return data;
};

export const getChatHistory = async () => {
  const response = await fetch(
    `${API_BASE_URL}/chat/history`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch chat history"
    );
  }

  return data;
};

export const deleteChatHistory = async () => {
  const response = await fetch(
    `${API_BASE_URL}/chat/history`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete chat history"
    );
  }

  return data;
};