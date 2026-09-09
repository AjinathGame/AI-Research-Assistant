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

export const getTechnologies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/technologies`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch technologies"
    );
  }

  return data;
};

export const getTechnologyById = async (technologyId) => {
  const response = await fetch(
    `${API_BASE_URL}/technologies/${technologyId}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch technology"
    );
  }

  return data;
};

export const getTechnologyBySlug = async (slug) => {
  const response = await fetch(
    `${API_BASE_URL}/technologies/slug/${slug}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch technology"
    );
  }

  return data;
};

export const createTechnology = async ({
  name,
  description,
}) => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const response = await fetch(
    `${API_BASE_URL}/technologies`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: name.trim(),
        slug,
        description: description.trim(),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create technology"
    );
  }

  return data;
};

export const deleteTechnology = async (technologyId) => {
  const response = await fetch(
    `${API_BASE_URL}/technologies/${technologyId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete technology"
    );
  }

  return data;
};