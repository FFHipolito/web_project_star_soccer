import { userMock, matchMock } from "../mock-data";

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
    const response = await new Promise((resolve) => {
      resolve({
        data: { ...userMock },
      });
    });
    // TODO modify after backend implementation
    // return this._makeRequest("/user/me");
    return response;
  }

  async updateUserInfo(userData) {
    const response = await new Promise((resolve) => {
      resolve({
        data: {
          ...userData,
          isAdmin: userData.email === "useradmin@email.com",
        },
      });
    });
    // TODO modify after backend implementation
    // return this._makeRequest("/user/me", "PATCH", { userData });
    return response;
  }

  async getMatch() {
    const response = await new Promise((resolve) => {
      resolve({
        data: { ...matchMock },
      });
    });
    // TODO modify after backend implementation
    // return this._makeRequest("/match");
    return response;
  }

  async createMatch(matchData) {
    const response = await new Promise((resolve) => {
      resolve({
        data: {
          id: "1",
          date: matchData.date,
          time: matchData.time,
          players: [],
        },
      });
    });
    // TODO modify after backend implementation
    // return this._makeRequest("/match", "POST", { matchData });
    return response;
  }

  async subscribeMatch(matchId, userId, isSubscribed) {
    const response = await new Promise((resolve) => {
      resolve({
        data: {
          ...userMock,
          isSubscribed,
        },
      });
    });
    // TODO modify after backend implementation
    // return this._makeRequest(/match/${matchId}, "POST", userId);
    return response;
  }

  async deleteMatch(matchId) {
    // TODO modify after backend implementation
    // include fetch in a try-catch block
    const response = await new Promise((resolve, reject) => {
      let success = true;

      if (success) {
        resolve({
          success: true,
          message: "Match closed!",
        });
      } else {
        reject("Ops, something went wrong!");
      }
    });
    // return this._makeRequest(/match/${matchId}, "DELETE");
    return response;
  }
}

const api = new Api("http://localhost:3001", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
