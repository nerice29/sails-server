
const credentials = {
    client: {
        id: "f96ad221-16b4-4522-ae92-bcb9f72f19e3",
        secret:"acxKU72$_ekalDUPEE719*$",
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);

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
        console.log('RESULTAT TOKEN',result)
        const token = outlookInstance.accessToken.create(result);
        console.log(`outlook/helper/getTokenFromCode token => ${token}`)
        return exits.success(token);

    }


};
