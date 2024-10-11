import { userMock } from "../mock-data";

// const BASE_URL = "http://localhost:3001";

// generate true or false value for api calls randomly,
// remove after backend implementation
const INVALID_DATA = "Invalid e-mail or password!";
const EMAIL_REGISTERED = "This is email is already registered!";
const ERROR_MESSAGE = "Ops, something went wrong!";
const successApiCallRandomly = () => {
  return Math.random() < 0.7;
};

export const authorize = async (email, password) => {
  try {
    const response = await new Promise((resolve, reject) => {
      if (successApiCallRandomly()) {
        if (email === userMock.email && password === "123456") {
          resolve({
            success: true,
            message: "Login successful!",
            data: {
              token: "testjsonwebtoken",
            },
          });
        } else {
          const error = new Error(INVALID_DATA);
          error.name = "ValidationError";
          reject(error);
        }
      } else {
        reject(new Error(ERROR_MESSAGE));
      }
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
      if (successApiCallRandomly()) {
        if (userData.email !== userMock.email) {
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
        } else {
          const error = new Error(EMAIL_REGISTERED);
          error.name = "ValidationError";
          reject(error);
        }
      } else {
        reject(new Error(ERROR_MESSAGE));
      }
    });
    localStorage.setItem("jwt", response.data.token);
    localStorage.setItem("loggedIn", "true");

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    await new Promise((resolve, reject) => {
      if (successApiCallRandomly()) {
        resolve({
          success: true,
          message: "Token valid!",
        });
      } else {
        reject(new Error(ERROR_MESSAGE));
      }
    });

    localStorage.setItem("loggedIn", "true");
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};
