import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getFoldersByTechnology = async (technologyId) => {
  const response = await fetch(
    `${API_BASE_URL}/folders/technology/${technologyId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch folders"
    );
  }

  return data;
};

export const createFolder = async ({
  name,
  slug,
  description,
  technologyId,
  parentFolderId = null,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/folders`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        slug,
        description,
        technologyId,
        parentFolderId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create folder"
    );
  }

  return data;
};

export const getPdfsByFolder = async (folderId) => {
  const response = await fetch(
    `${API_BASE_URL}/pdf/folder/${folderId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch PDFs"
    );
  }

  return data;
};

export const deleteFolder = async (folderId) => {
  const response = await fetch(
    `${API_BASE_URL}/folders/${folderId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete folder"
    );
  }

  return data;
};