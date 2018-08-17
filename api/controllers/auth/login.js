const bcrypt = require('bcrypt');

module.exports={

    friendlyName:'login',

    description : 'login as user',

    inputs : {

        firstName: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string'
        }
    },
    exits : {
        notFound: {
            description: 'The specified user was found in the database.',
            responseType: 'notFound'
        }
    },

    fn : async function(inputs,exits){

       let user = await User.findOne({firstName : inputs.firstName})

        if(!user){return exits.notFound()}

        console.log("user found .password =>",user.password)
        if(user.password===inputs.password){
            let token = await Token.findOne({owner:user.id})
            if(!token){return exits.error("no authorization for this user")}
            this.req.user=user
            return exits.success(token)
        }else{
            return exits.error("password not matched")
        }
        /*bcrypt.compare(inputs.password,user.password, async function(err, res) {
            if(err){return exits.error("password error")}
            console.log("result =>",res)
            if(!res){return exits.error("password not matched")}
            let token = await Token.findOne({owner:user.id})
            if(!token){return exits.error("no authorization for this user")}
            this.req.user=user
            return exits.success(token)
        });*/

    }
}