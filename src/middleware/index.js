const basicAuth = require("basic-auth");

function getCredentials(req, res, next) {
    const auth = basicAuth(req);
    const emailAddress = basicAuth(req).name;
    const password = basicAuth(req).pass;

    if (auth && emailAddress && password) {
        User.authenticate(emailAddress, password, function (err, user) {
            if (err) {
                next(err);
            } else {
                return user;
            }
        });
    } else {
        const err = new Error("Unauthorized");
        err.status = 401;
        return next(err);
    }
}

module.exports.getCredentials = getCredentials;
