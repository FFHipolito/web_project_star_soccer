const BASE_URL = "http://localhost:3001";

export const authorize = async (email, password) => {
  // TODO add after backend implementation

  //   try {
  //     const response = await fetch(`${BASE_URL}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const { token } = await response.json();
  //     localStorage.setItem("jwt", token);
  //   } catch (error) {
  //     console.error("Authorization error:", error);
  //     throw error;
  //   }

  // TODO remove after backend implementation
  const token = "testjsonwebtoken";
  localStorage.setItem("jwt", token);
  console.log("get token from local storage", localStorage.getItem("jwt"));
};
