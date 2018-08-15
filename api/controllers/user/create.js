

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

        return exits.success(user)
    }


}