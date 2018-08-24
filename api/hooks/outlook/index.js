/**
 * outlook hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineOutlookHook(sails) {

    return {
        outlookAuth: null,
        /**
         * Runs when a Sails app loads/lifts.
         *
         * @param {Function} done
         */
        initialize: function (done) {

            let credential = {
                client: _.pick (sails.config.outlook, ['id', 'secret']),
                auth: _.pick (sails.config.outlook,
                    ['tokenHost', 'authorizePath', 'tokenPath']),
            }


            sails.authOutlook = () => {
                //if(!this.outlookAuth){
                //console.log('configuration:one thing')
                return require('simple-oauth2')
                    .create(credential)
                //}
                //console.log('configuration:count',++i)
                // return this.outlookAuth
            }
            return done();

        }

    };

};
