module.exports = {

    friendlyName: 'Get organization members',

    description: 'find all members of organization',

    inputs: {
       
    },
    exits: {

       
    },
    fn: async function (inputs, exits) {
       
       let list = await sails.helpers.ews.getMembers()

       if (!list) {
          return exits.error ({
            code: 'CONFIG_ERROR',
            message: 'Error of create of retrieve ews organization users',
          })
        }

        return exits.success(list)
    }
}