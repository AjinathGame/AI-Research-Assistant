const API_URL = "http://localhost:5000/api/admin";

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

export const getAdminDashboardStats = async () => {
  const response = await fetch(`${API_URL}/dashboard`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
};

export const getRecentActivities = async () => {
  const response = await fetch(
    `${API_URL}/dashboard/recent-activity`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch recent activities"
    );
  }

  return data;
};

export const getUsersOverview = async (period = "month") => {
  const response = await fetch(
    `${API_URL}/dashboard/users-overview?period=${period}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch users overview"
    );
  }

  return data;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch users"
    );
  }

  return data;
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch user details"
    );
  }

  return data;
};

export const updateUserRole = async (id, role) => {
  const response = await fetch(`${API_URL}/users/${id}/role`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ role }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update user role"
    );
  }

  return data;
};

export const updateUserStatus = async (id, isActive) => {
  const response = await fetch(`${API_URL}/users/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ isActive }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update user status"
    );
  }

  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete user"
    );
  }

  return data;
};

export const getAllTechnologies = async () => {
  const response = await fetch(
    `${API_URL}/technologies`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch technologies"
    );
  }

  return data;
};

export const getTechnologyById = async (id) => {
  const response = await fetch(
    `${API_URL}/technologies/${id}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch technology details"
    );
  }

  return data;
};

export const updateTechnologyStatus = async (
  id,
  isActive
) => {
  const response = await fetch(
    `${API_URL}/technologies/${id}/status`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update technology status"
    );
  }

  return data;
};

export const deleteTechnology = async (id) => {
  const response = await fetch(
    `${API_URL}/technologies/${id}`,
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

export const getAllPdfs = async () => {
  const response = await fetch(`${API_URL}/pdfs`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch documents"
    );
  }

  return data;
};

export const deletePdf = async (id) => {
  const response = await fetch(`${API_URL}/pdfs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete document");
  }

  return data;
};


export const getAllQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch questions");
  }

  return data;
};

export const getQuestionById = async (id) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch question details"
    );
  }

  return data;
};
export const deleteQuestion = async (id) => {
  const response = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete question");
  }

  return data;
};


export const getAdminProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch admin profile"
    );
  }

  return data;
};

export const updateAdminProfile = async (profile) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profile.name.trim(),
      phone: profile.phone?.trim() || "",
      location: profile.location?.trim() || "",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update admin profile"
    );
  }

  return data;
};
export const getFolderById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/admin/folders/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch folder"
    );
  }

  return data;
};

export const viewAdminPdf = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(
    `${API_URL}/pdfs/${id}/view`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let message = "Failed to open PDF";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      message = "Failed to open PDF";
    }

    throw new Error(message);
  }

  return response.blob();
};