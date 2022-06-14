const { Console } = require('console');
const config = require('../../config/config');
const axios = require('axios').default;

const host = config.gplusApiHost;
let accessToken = null;
let tokenExpiredAt = Date.now();

const getNewAccessToken = async () => {
  const endPoint = '/api_token';
  const appId = config.gplusApiAppId;
  const appKey = config.gplusApiAppKey;
  const query = {
    appId: appId,
    appKey: appKey,
  };
  const res = await axios({
    method: 'post',
    url: host + endPoint,
    data: query,
  });
  if (res && res.data && res.data.code === 200) {
    accessToken = res.data.data.accessToken;
    tokenExpiredAt = Date.now() + 1000 * res.data.data.expiresIn;
  } else {
    Console.log(res);
  }
};

const tokenExpired = () => {
  return tokenExpiredAt - Date.now() < 1000; // gonna expired in 1000 ms.
};

const getAccessToken = async () => {
  if (accessToken === null || tokenExpired()) {
    await getNewAccessToken();
  }
  // console.log(accessToken);
  return accessToken;
};

module.exports = {
  getAccessToken,
};
