const { default: axios } = require('axios');
const accessTokenManager = require('./accessTokenManager');
const config = require('../../config/config');
const crypto = require('crypto');

const apiHost = config.gplusApiHost;
const appKey = config.gplusApiAppKey;

const apiRequest = async (endpoint, query) => {
  const accessToken = await accessTokenManager.getAccessToken();
  const sign = crypto
    .createHash('md5')
    .update(JSON.stringify(query) + appKey)
    .digest('hex');
  const headers = {
    sign: sign,
    accesstoken: accessToken,
  };
  // console.log(accessToken, sign);
  const res = await axios({
    method: 'post',
    url: apiHost + endpoint,
    headers: headers,
    data: query,
  });
  if (res && res.data.code === 200) {
    return res;
  } else {
    console.log(res.data);
  }
};

module.exports = {
  apiRequest,
};
