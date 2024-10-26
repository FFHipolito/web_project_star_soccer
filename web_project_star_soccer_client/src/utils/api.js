const BASE_URL = "http://localhost:3001";

// generate true or false value for api calls randomly,
// remove after backend implementation
const ERROR_MESSAGE = "Ops, something went wrong!";
const successApiCallRandomly = () => {
  return Math.random() < 0.7;
};

class Api {
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.options.headers },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options).then((res) => {
      if (!res.ok) Promise.reject(Error`${res.status}`);
      return res.json();
    });
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUserInfo(userData) {
    try {
      const response = await new Promise((resolve, reject) => {
        if (successApiCallRandomly()) {
          resolve({
            ok: true,
            message: "Profile updated!",
            data: {
              ...userData,
              isAdmin: userData.email === "useradmin@email.com",
            },
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest("/user/me", "PATCH", { userData });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMatch() {
    try {
      const response = await fetch(`${BASE_URL}/matches/match`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createMatch(date, time) {
    try {
      const response = await fetch(`${BASE_URL}/matches/match`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async subscribeMatch(matchId, userId) {
    try {
      const response = await fetch(`${BASE_URL}/matches/match/${matchId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async closeMatch(matchId) {
    try {
      const response = await fetch(`${BASE_URL}/matches/match/${matchId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const api = new Api("http://localhost:3001", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
