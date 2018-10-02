let moment = require('moment')
let graph  = require("@microsoft/microsoft-graph-client")
module.exports = {


    friendlyName: 'Find event day',


    description: '',


    inputs: {
        owner:{
            type: 'string'
        },
        date:{
            type: 'ref'
        }
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


        const start = moment(inputs.date).startOf('day');

        const end = moment(inputs.date).endOf('day');

        try {

            const result = await client
                .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
                .top(10)
                .select('subject,start,end,attendees,showAs')
                .filter("showAs ne 'free'")
                .orderby('start/dateTime DESC')
                // .format('json')
                .get();
            exits.success(result.value)

        } catch (err) {
            return exits.error(err.message);
        }
        // All done.


    }


};

