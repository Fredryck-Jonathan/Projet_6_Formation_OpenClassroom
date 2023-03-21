const validator = require('validator');
 
module.exports = (req, res, next) => {
   try {
    validator.isEmail(req.body.email);
    console.log(req.body.email)
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

