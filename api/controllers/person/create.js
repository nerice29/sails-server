

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

        return exits.success(person)
    }


}