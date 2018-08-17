
const jwt = require('jsonwebtoken');

module.exports={

    friendlyName: 'Create',


    description: 'Create user.',


    inputs: {

        lastName: {
            type: 'string',
            required: true
        },
        firstName: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        sex: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string'
        },
        profession: {
            type: 'string',
        },
        phoneNumber: {
            type: 'string',
            allowNull: true
        },
        status : {
            type:'string',
            isIn:['ADMIN','PARTICULAR'],
            required:true
        }

    },
    exits: {

        notFound: {
            description: 'The specified user was found in the database.',
            responseType: 'notFound'
        }
    },

    fn:async function (inputs, exits) {

        let user = await User.create(inputs).fetch()

        if (!user) { return exits.notFound() }

        let expireDate= Math.floor(Date.now() / 1000) + (60 * 60) //1 heure
        let token = await jwt.sign({exp:expireDate,data:user},'_secret')
        if(!token){exits.error("user authorization failed")}

        let credential=await Token.create({
            owner: user.id,
            token: token,
            tokenExpireDate:expireDate
        })
        console.log("api:auth::register:::credential=>",credential)
        this.req.user=user
        return exits.success(token)
    }


}