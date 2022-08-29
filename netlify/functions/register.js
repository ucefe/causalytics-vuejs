const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const data = event.body;
    const headers = { "Content-Type": "application/json" };
    let response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.VITE_FIREBASE_TOKEN,
      data,
      { headers }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    console.log(err.message);
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
    return error;
  }
};
