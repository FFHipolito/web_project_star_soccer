const BASE_URL = "http://localhost:3001";

export const authorize = async (email, password) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@email.com" && password === "123456") {
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
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};

export const signup = async (name, email, phone, password) => {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "User signup successfully!",
          data: {
            token: "testjsonwebtoken",
          },
        });
      }, 1000);
    });

    const { token } = response.data;
    localStorage.setItem("jwt", token);
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};
