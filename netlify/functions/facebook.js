const axios = require("axios");

exports.handler = async (event, context) => {
  try {
   
    let response = await axios.get(
      "https://graph.facebook.com/v14.0/act_25064918/insights?fields=campaign_id,campaign_name,impressions,cpc,account_currency&level=campaign&time_range[since]=" +
        event.queryStringParameters.from +
        "&time_range[until]=" +
        event.queryStringParameters.to +
        "&access_token=" +
        process.env.VITE_FB_TOKEN
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
    return error;
  }
};
