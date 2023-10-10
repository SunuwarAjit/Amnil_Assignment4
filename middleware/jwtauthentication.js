const jwt = require('jsonwebtoken');


const jwtAuth = async (req,res, next)=>{
    const header = await req.headers['authorization']
    if(!header) res.send('Auth token missing');
    const token = header.split(' ')[1]
    if(!token) return res.status(401).send('Unathenticated')

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(decode)
    next();
}

module.exports = jwtAuth