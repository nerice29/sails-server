

module.exports.crontab={

	'* * * * * *' : function(){
		//require('../api')
		require('../crontab/job.js').run()
	}
}