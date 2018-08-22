

module.exports = async function(req, res, next){
    //branch an middleware to another
    require('./isAuthorized')(req,res,function(){

        if(!req.isADMIN){
            return res.status(401).json({
                code: 'AUTH_ADMIN_INVALID',
                message: 'Invalid admin Token!'
            });
        }
        next()
    })
}
