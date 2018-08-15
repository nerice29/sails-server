module.exports = {

    friendlyName: 'find One',

    description: 'find One User',

    inputs: {
        id: {
            type: 'string',
            required: true
        }
    },
    exits: {

        notFound: {
            description: "No user found for specific id",
            responseType: "Not Found"
        }
    },
    fn: async function (inputs, exits) {

        let user = await User.findOne({id: inputs.id})

        if (!user) {
            return exits.notFound()
        }

        return exits.success(user)
    }
}