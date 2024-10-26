const BASE_URL = "http://localhost:3001";

class Api {
  getHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: this.getHeader(),
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

  async updateUserInfo(name, email, phone, password) {
    if (!name && !email && !phone && !password) {
      throw new Error("Nothing has changed...");
    }

    let body = {};
    if (name) body.name = name;
    if (email) body.email = email;
    if (phone) body.phone = phone;
    if (password) body.password = password;

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: this.getHeader(),
        body: JSON.stringify({ ...body }),
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
