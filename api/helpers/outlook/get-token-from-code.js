
module.exports = {


    friendlyName: 'get token',


    description: 'get token from code',


    inputs: {

        auth_code:{
            type: 'string',
            required: true
        }
    },


    exits: {

    },


    fn: async function (inputs, exits) {

        let outlookInstance = sails.authOutlook();
        let result = await outlookInstance.authorizationCode.getToken({
            code: inputs.auth_code,
            redirect_uri:sails.config.outlook.redirectUri,
            scope: sails.config.outlook.APP_SCOPES
        });
        //console.log('RESULTAT TOKEN',result)
        const token = outlookInstance.accessToken.create(result);
        //console.log(`outlook/helper/getTokenFromCode token => ${token}`)
        return exits.success(token);

    }


};
