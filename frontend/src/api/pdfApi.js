import API_BASE_URL from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const uploadPdf = async ({
  file,
  technologyId,
  folderId,
  visibility,
}) => {
  const formData = new FormData();

  formData.append("pdf", file);
  formData.append("technologyId", technologyId);
  formData.append("folderId", folderId);
  formData.append("visibility", visibility);

  const response = await fetch(
    `${API_BASE_URL}/pdf/upload`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload PDF"
    );
  }

  return data;
};

export const getPdfList = async () => {
  const response = await fetch(
    `${API_BASE_URL}/pdf`,
    {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch PDF list"
    );
  }

  return data;
};

export const getPdfsByFolder = async (folderId) => {
  const response = await fetch(
    `${API_BASE_URL}/pdf/folder/${folderId}`,
    {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
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

export const deletePdf = async (pdfId) => {
  const response = await fetch(
    `${API_BASE_URL}/pdf/${pdfId}`,
    {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete PDF"
    );
  }

  return data;
};

export const getDashboardStats = async () => {
  const response = await fetch(
    `${API_BASE_URL}/pdf/dashboard-stats`,
    {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load dashboard statistics"
    );
  }

  return data;
};