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
        console.log (`outlook open : inputs code : ${inputs.code}`)

        if (inputs.code) {
            let client = JSON.parse(inputs.state)
            console.log ('outlook open : client', client )
            let outlookClient = await OutlookClient.findOne(client.id)
            if (!outlookClient) {
                return exits.error ({
                    code: 'USER_REQUEST_NOT_FOUND',
                    message: 'CLIENT INCONNU',
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
                console.log("token ",token)
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
                        message: 'Error of create of retrieve access outlook user',
                    })
                }

                console.log ('outlook client new access =>', result)

                return exits.redirect(outlookClient.clientRedirectUrl)

               /* // Initialize Graph client
                const client = graph.Client.init({
                    authProvider: (done) => {
                        done(null, token);
                    }
                });

                // Set start of the calendar view to today at midnight
                const start = new Date(new Date().setHours(0,0,0));
                // Set end of the calendar view to 7 days from start
                const end = new Date(new Date(start).setDate(start.getDate() + 7));

                let event = {
                    "subject": "Let's go for lunch",
                    "body": {
                        "contentType": "HTML",
                        "content": "Does late morning work for you?"
                    },
                    "start": {
                        "dateTime": "2018-08-17T21:00:00",
                        "timeZone": "Pacific Standard Time"
                    },
                    "end": {
                        "dateTime": "2018-08-17T23:00:00",
                        "timeZone": "Pacific Standard Time"
                    },
                    "location": {
                        "displayName": "Harry's Bar"
                    },
                    "attendees": [{
                        "emailAddress": {
                            "address": "nericeeno@gmail.com",
                            "name": "HOUNSA Nérice"
                        },
                        "type": "required"
                    }]
                }
                client
                    .api('/me/events')
                    .post(event, (err, res) => {
                        if(err){return exits.error("error")}
                        return exits.success(res)
                    })*/
                /*try {
                    // Get the first 10 events for the coming week
                    const result = await client
                        .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
                        .top(10)
                        .select('subject,start,end,attendees')
                        .orderby('start/dateTime DESC')
                        .get();

                    return exits.success(result)

                } catch (err) {

                   return exits.error("outlook : open :: error")
                }*/


            } catch (e) {

                return exits.serverError(e.message)
            }

        }else{
            return exits.error("BAD OUTLOOK SERVER REQUEST")
        }


    },
}
