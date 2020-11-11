const { authCookieName, authHeaderName } = require("../config/index");

module.exports = function getJWT(req) {
    return req.cookies[authCookieName] || req.headers[authHeaderName];
}