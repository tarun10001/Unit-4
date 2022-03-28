var jwt = require('jsonwebtoken');

function verifyToken(token)
{
    return promise = new Promise(function(resolve, reject) {
        jwt.verify(token, 'secretkey', function(err, decoded) {
            if(err)
                return reject(err)
            else
                return resolve(decoded)
          });
    })
}

const authenticate = async (req, res, next) => {
    if(!req.headers.authorization)
        return res.status(401).send({message : 'You are not authorized to access this'});
    
    if(!req.headers.authorization.startsWith('Bearer '))
        return res.status(401).send({message : 'You are not authorized to access this'});
    
    const token = req.headers.authorization.split(" ")[1];

    const decoded = await verifyToken(token);
    console.log(decoded);
    req.user = decoded.user;
    next();
}

module.exports = authenticate;