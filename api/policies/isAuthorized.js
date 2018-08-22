jwt = require("jsonwebtoken");
let status = ["ADMIN","SUPER_ADMIN","APPLICATION","CLIENT"]

module.exports= async function isAuthorized(req, res, next) {

    let token = req.get('Access-Token')|| req.query['Access-Token']||req.query['access-token']||req.headers['access-token']

    if(!token){return res.status(401).json({
        code:'ACCESS_DENIED',
        message:'Require access token'
    })}

    //verify if this token was from us or not
    jwt.verify(token, "_secret", async function (err, decoded) {
        if (err) {
            sails.log("verification error", err);
            if (err.name === "TokenExpiredError")
                return res.forbidden("Session timed out, please login again");
            else
                return res.forbidden("Error authenticating, please login again");
        }

        //console.log("api:policies:isAuthorized:decode =>",decoded)

        let user= await User.find({id:decoded.id})
        user=user[0]
        if(!user){return res.status(401).json({
                code:'ACCESS_DENIED',
                message:'User not found'
            })}
            console.log("user",user)
        req.isAutentificated = true
        if(status.some((s)=>s===user.status)){
            console.log("make it")
            req[`is${user.status}`]=true

        }

        req.token = {
            id: user.id,
            username: user.fullName,
            user:user,
            roles:[],
            permissions:[],
            key: token
        }
        next();

    })

}