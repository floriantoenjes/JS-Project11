const basicAuth = require("basic-auth");
const User = require("../models/user");

function getCredentials(req, res, next) {
    const auth = basicAuth(req);
    const emailAddress = basicAuth(req).name;
    const password = basicAuth(req).pass;

    if (auth && emailAddress && password) {

        User.authenticate(emailAddress, password, function (err, user) {
            if (err) {
                return next(err);
            } else {
                req.user = user;
                return next();
            }
        });
    } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        return next(err);
    }
}

module.exports.getCredentials = getCredentials;
