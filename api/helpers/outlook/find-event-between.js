let moment = require('moment')
let graph  = require("@microsoft/microsoft-graph-client")
module.exports = {


    friendlyName: 'Find busy event between',


    description: '',


    inputs: {
        start:{
            type: 'ref',
        },
        end: {
            type: 'ref',
        },
    },


    exits: {

    },


    fn: async function (inputs, exits) {
        // Initialize Graph client
        const client = graph.Client.init({
            authProvider: (done) => {
                sails.helpers.outlook
                    .getValidToken(inputs.owner).then(({token})=>{
                    done(null,token);
                })
            }
        });


        const start = moment(inputs.start).hour(0).minute(0).second(0);

        const end = moment(inputs.end).hour(23).minute(59).second(59);

        try {

            const result = await client
                .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
                .top(10)
                .select('subject,start,end,attendees,showAs')
                .filter("showAs ne'free'")
                .orderby('start/dateTime DESC')
                // .format('json')
                .get();

            exits.success(result)

        } catch (err) {

            return exits.error(err.message);
        }
        // All done.



    }


};

