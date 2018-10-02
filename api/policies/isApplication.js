

module.exports=async function (req,res,next) {

    require('./isAuthorized')(req,res,()=>{

        if(!req.isAPPLICATION){
            return res.start(401).json({
                code : 'INVALID USER TYPE APPLICATION',
                message : 'CURRENT USER IS NOT APPLICATION'
            })
        }
        console.log("VALID USER TYPE APPLICATION")
        next()
    })
}