
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

       let user = await User.findOne({
           firstName : inputs.firstName,
           password : inputs.password
       })

        if(!user){return exits.notFound()}

        return exits.success(user)
    }
}