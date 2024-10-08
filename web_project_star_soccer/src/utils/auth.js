import { userMock } from "../mock-data";

const BASE_URL = "http://localhost:3001";

export const authorize = async (email, password) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === userMock.email && password === "123456") {
          resolve({
            success: true,
            message: "Login successful!",
            data: {
              token: "testjsonwebtoken",
            },
          });
        } else {
          reject(new Error("Invalid e-mail or password!"));
        }
      }, 1000);
    });

    const { token } = response.data;
    localStorage.setItem("jwt", token);
    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "User signup successfully!",
          data: {
            token: "testjsonwebtoken",
            user: {
              id: "88",
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              isAdmin: false,
              isSubscribed: false,
            },
          },
        });
      }, 1000);
    });

    localStorage.setItem("jwt", response.data.token);
    localStorage.setItem("loggedIn", "true");

    return response;
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};
