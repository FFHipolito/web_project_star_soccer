import { userMock, matchMock } from "../mock-data";

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
      const response = await new Promise((resolve, reject) => {
        if (successApiCallRandomly()) {
          resolve({
            data: { ...userMock },
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest("/user/me");
      return response;
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
      const response = await new Promise((resolve, reject) => {
        if (successApiCallRandomly()) {
          resolve({
            data: { ...matchMock },
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest("/match");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createMatch(matchData) {
    try {
      const response = await new Promise((resolve, reject) => {
        if (successApiCallRandomly()) {
          resolve({
            ok: true,
            message: "Match created!",
            data: {
              id: "1",
              date: matchData.date,
              time: matchData.time,
              players: [],
            },
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest("/match", "POST", { matchData });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async subscribeMatch(match, user) {
    try {
      let playersUpdated = [];
      // if user is already subscribed remove him, if not add him to the match
      user.isSubscribed
        ? (playersUpdated = match.players.filter(
            (player) => player.id !== user.id
          ))
        : (playersUpdated = [...match.players, user]);

      const response = await new Promise((resolve, reject) => {
        const successMessage = `You ${
          user.isSubscribed ? "unsubscribed" : "subscribed"
        } for the match!`;

        if (successApiCallRandomly()) {
          resolve({
            ok: true,
            message: successMessage,
            data: {
              user: {
                ...user,
                isSubscribed: !user.isSubscribed,
              },
              match: {
                ...match,
                players: playersUpdated,
              },
            },
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest(/match/${matchId}, "POST", userId);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteMatch(matchId) {
    try {
      const response = await new Promise((resolve, reject) => {
        if (successApiCallRandomly()) {
          resolve({
            ok: true,
            message: "Match closed!",
          });
        } else {
          reject(new Error(ERROR_MESSAGE));
        }
      });

      // return this._makeRequest(/match/${matchId}, "DELETE");
      return response;
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
