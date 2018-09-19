
const jwt = require('jsonwebtoken');
module.exports={

    friendlyName: 'Create',


    description: 'Create person.',


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
    },
    exits: {

        notFound: {
            description: 'The specified user was found in the database.',
            responseType: 'notFound'
        }
    },

    fn:async function (inputs, exits) {

        let person = await Person.create(inputs).fetch()

        if (!person) { return exits.notFound() }

        if(! person){return exits.error("cannot create person ! ")}

        //TODO : send confirmation gmail to person when he confirm register him as user

        let user = await User.create({
            lastName:person.lastName,
            firstName:person.firstName,
            password:person.password,
            sex:person.sex,
            email:person.email,
            profession:person.profession,
            phoneNumber:person.phoneNumber,
            status:'PARTICULAR'
        }).fetch()
        if(!user){return exits.error("user creation failed")}
        let expireDate= Math.floor(Date.now() / 1000) + (60 * 60) //1 heure
        let token = await jwt.sign({exp:expireDate,data:user},'_secret')
        if(!token){exits.error("user authorization failed")}

        let credential=await Token.create({
            owner: user.id,
            token: token,
            tokenExpireDate:expireDate
        }).fetch()
        console.log("api:auth::register:::credential=>",credential)
        this.req.token={
            id: user.id,
            username: user.fullName,
            user,
            roles:[],
            permissions:[],
            key: credential.token
        }
        return exits.success({token})
    }


}