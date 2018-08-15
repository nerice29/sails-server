module.exports = {

    friendlyName: 'find One',

    description: 'find One Person',

    inputs: {
        id: {
            type: 'string',
            required: true
        }
    },
    exits: {

        notFound: {
            description: "No Person found for specific id",
            responseType: "Not Found"
        }
    },
    fn: async function (inputs, exits) {

        let person = await Person.findOne({id: inputs.id})

        if (!person) {
            return exits.notFound()
        }

        return exits.success(person)
    }
}