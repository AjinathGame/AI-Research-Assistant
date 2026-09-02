import API_BASE_URL from "./api";

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
    `${API_BASE_URL}/pdf`
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
    `${API_BASE_URL}/pdf/folder/${folderId}`
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
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load dashboard statistics"
    );
  }

  return data;
};