export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login"
    });
  },

  async register(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "register"
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    //todo hide it
    let url = ".netlify/functions/" + mode;
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    if (!res.ok) {
      throw new Error(res.message || "Failed auth !");
    }
    let data = await res.json();
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn
    });
  },

  checkLocalStorage(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null
    });
    console.log("logout");
  }
};
