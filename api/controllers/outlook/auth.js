

module.exports = {

    friendlyName: 'auth',

    description: 'auth 0auth2',

    inputs: {

    },

    exits: {

        fail: {
            responseType: 'authFail',
        },
        error: {
            status: 500,
            responseType: '',
        },
    },

    fn: async function (inputs, exits) {

        try{
            let redirect = sails.authOutlook()
                .authorizationCode
                .authorizeURL ({
                    redirect_uri: sails.config.outlook.redirectUri,
                    scope: sails.config.outlook.APP_SCOPES,
                })

            return exits.success({redirect})
        }catch (e) {
            console.log ('outlook:auth::generate url', e)
            return exits.error ({code: 'INVALID_BODY_REQUEST', message: e.message})
        }

    }
}
