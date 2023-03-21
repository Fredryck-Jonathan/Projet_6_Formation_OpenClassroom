const passwordschema = require('../models/password');

module.exports = (req, res, next) => {
    try {
     passwordschema.validate(req.body.password);
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };