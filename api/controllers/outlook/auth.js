

module.exports = {

    friendlyName: 'auth',

    description: 'auth 0auth2',

    inputs: {
        clientRedirectUrl : {
            type:'string',
            require:true
        }
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
            let outlookClient = await OutlookClient.create ({
                owner: this.req.token.user.id,
                clientRedirectUrl: inputs.clientRedirectUrl,
            }).fetch ()
            // reference for local to get info of user
            let client = {
                id: outlookClient.id,
            }
            // parameter for create auth url outlook
            let redirect = sails.authOutlook()
                .authorizationCode
                .authorizeURL ({
                    redirect_uri: sails.config.outlook.redirectUri,
                    scope: sails.config.outlook.APP_SCOPES,
                    state: JSON.stringify (client),
                })

            return exits.success({redirect})
        }catch (e) {
            console.log ('outlook:auth::generate url', e)
            return exits.error ({code: 'INVALID_BODY_REQUEST', message: e.message})
        }

    }
}
