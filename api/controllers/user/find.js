

module.exports={

    friendlyName:'find',

    description:'find a user',

    inputs : {

    },

    exits:{

        notFound: {
            description: 'The specified user was found in the database.',
            responseType: 'notFound'
        }
    },

    fn:async function (inputs,exits){

        let users = await User.find()

        if(!users){return exits.notFound()}

        return exits.success(users)
    }
}