let graph = require ('@microsoft/microsoft-graph-client')

module.exports = {

    config: {
        method: 'GET',
    },
    friendlyName: 'open',

    description: 'open outlook',

    inputs: {
        code: {
            type: 'string',
        },
        state: {
            type: 'string',
        },
    },

    exits: {
        fail: {
            responseType: 'authFail',
        },
        redirect:{
            responseType: 'redirect'
        },
        serverError: {
            responseType: 'serverError'
        }
    },
    fn: async function (inputs, exits) {
        //console.log (`outlook open : inputs code : ${inputs.code}`)

        if (inputs.code && inputs.state) {
            let client = JSON.parse(inputs.state)
           // console.log ('outlook open : client', client )
            let outlookClient = await OutlookClient.findOne(client.id)
            if (!outlookClient) {
                return exits.error ({
                    code: 'USER_REQUEST_NOT_FOUND',
                    message: 'FAKE USER',
                })
            }
            try {

                let token = await sails
                    .helpers
                    .outlook
                    .getTokenFromCode
                    .with({
                        auth_code: inputs.code
                    })
                    .intercept((err) => {
                    console.log('ERROR:OUTLOOK::INTERCEPT',err)
                    return err
                })
                if (!token) {
                    return exits.error ({
                        code: 'USER_REQUEST_TOKEN_INVALID',
                        message: 'Token outlook invalid',
                    })
                }
                //console.log("token ",token)
                const result = await sails
                    .helpers
                    .outlook
                    .setCredentials
                    .with ({
                        token: token.token.access_token,
                        tokenExpireDate: token.token.expires_at.getTime (),
                        idToken: token.token.id_token,
                        refreshToken: token.token.refresh_token,
                        clientId: outlookClient.owner,
                    })
                if (!result) {
                    return exits.error ({
                        code: 'USER_AUTH_OBJECT_ERROR',
                        message: 'Error of create or retrieve access outlook user',
                    })
                }

                return exits.redirect(outlookClient.clientRedirectUrl)


            } catch (e) {

                return exits.error(e.message)
            }

        }else{
            return exits.error("BAD OUTLOOK SERVER REQUEST")
        }


    },
}
