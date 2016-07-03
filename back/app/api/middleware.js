var jwt = require('jwt-simple');
var moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.headers.authorization;
    var payload = null;
    try {
      payload = jwt.decode(token, 'blablablaladoscuro');
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}
