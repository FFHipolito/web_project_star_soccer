const BASE_URL = "http://localhost:3001";

export const authorize = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const { token } = await response.json();
    localStorage.setItem("jwt", token);
    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signup = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const { token } = await response.json();
    localStorage.setItem("jwt", token);
    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
};
