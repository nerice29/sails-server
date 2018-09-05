module.exports = {

  friendlyName: 'get organization members list',

  description: '',

  inputs: {
    
  },

  exits: {

  },

  fn: async function (inputs, exits) {
   
      let list = await sails.helpers.ews.getMembers()

      if (!list) {
          return exits.error ({
            code: 'EWS_ERROR',
            message: 'Error of create of retrieve ews organization members',
          })
      }

      return exits.success(list)

  }
}
