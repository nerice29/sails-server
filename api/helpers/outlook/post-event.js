const moment = require('moment');
let graph  = require("@microsoft/microsoft-graph-client")

module.exports = {


    friendlyName: 'Create an outlook event',


    description: '',


    inputs: {

        clientId: {
            type: 'string',
            required: true
        },
        object: {
            type: 'string',
            required:true
        },
        date: {
            type: 'string',
            required: true,
        },

        startTime: {
            type: 'string',
            required: true
        },
        endTime: {
            type: 'string',
            required: true
        },
        body : {
            type:'string',
            required:true
        }
    },


    exits: {
        failToCreateEvent: {
            statusCode: 500,
            responseType: ''
        }
    },



    fn: async function (inputs, exits) {

        const client = graph.Client.init({
            authProvider: (done) => {
                sails.helpers.outlook
                    .getValidToken(inputs.clientId).then(({token})=>{
                    done(null,token);
                })
            }
        });

        console.log('EventJSON::',JSON.stringify(eventBody(inputs),null,4))

        try {
            let event = await client
                .api("/me/events")
                .post(eventBody(inputs));
            exits.success(event);
        }catch (err) {
            exits.failToCreateEvent(Object.assign(err,
                {code:'FAIL_TO_CREATE_EVENT_ON_CALENDAR'}))
        }
    }

};

function  eventBody (inputs){

    let date = moment(inputs.date).format('YYYY-MM-DD');
    let start = moment(`${date} ${inputs.startTime}`, 'YYYY-MM-DD HH:mm')
    let end = moment(`${date} ${inputs.endTime}`, 'YYYY-MM-DD HH:mm')

    return {
        subject: inputs.object,
        start: {
            dateTime: start.utc().toJSON(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
            dateTime: end.utc().toJSON(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        body:{
            contentType: 'html',
            content:`<p style="color: #5e5e5e">${inputs.body}</p>`
        },
        showAs: 'Busy'

    }
}
