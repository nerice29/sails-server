/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require('lodash');

module.exports = {

  attributes: {

      lastName: {
          type: 'string',
          required: true
      },
      firstName: {
          type: 'string',
          required: true
      },
      password: {
          type: 'string',
          required: true
      },
      sex: {
          type: 'string',
          required: true
      },
      email: {
          type: 'string'
      },
      profession: {
          type: 'string',
      },
      phoneNumber: {
          type: 'string',
          allowNull: true
      },
      status : {
          type:'string',
          isIn:['ADMIN','PARTICULAR'],
          required:true
      }

  },
    customToJSON: function () {

      this.fullname = `${_.capitalize(this.firstName)} ${(this.lastName||'').toUpperCase()}`
      return this;
    },
    beforeCreate: function (valueSet, cb) {
        nomarlizerName(valueSet)
        cb()
    },
    beforeUpdate: function (valueSet, cb) {
        nomarlizerName(valueSet)
        cb()
    },

};

function nomarlizerName (valueSet) {

    if (valueSet.lastName) {
        valueSet.lastName = (valueSet.lastName||'').toUpperCase()
    }
    if (valueSet.firstName) {
        valueSet.firstName = _.capitalize(valueSet.firstName)
    }
}
