
const EWS = require('node-ews');

module.exports = {


  friendlyName: 'Get organization members',


  description: '',


  inputs: {
  
  },


  exits: {


  },


  fn: async function (inputs, exits) {
    

    // exchange server connection info
    const ewsConfig = {
      username: 'nerice@sogelib.onmicrosoft.com',
      password: 'Sogelib29@12',
      host: 'https://ews.sogelib.onmicrosoft.com'
    };
     
    // initialize node-ews
    const ews = new EWS(ewsConfig);
     
    // define ews api function
    const ewsFunction = 'ExpandDL';
     
    // define ews api function args
    const ewsArgs = {
      'Mailbox': {
        'EmailAddress':'publiclist@sogelib.onmicrosoft.com'
      }
    };
     
    // query EWS and print resulting JSON to console
    let result = await ews.run(ewsFunction, ewsArgs)

    if(!result){return exits.error()}

    return exits.success(JSON.stringify(result))
  }


};

