

module.exports.crontab={

	'0 */1 * * * *' : async function(){
		//require('../api')
		//require('./crontab/job.js').run()
        await sails.helpers.job()
	}
}