/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require('lodash');
const bcrypt = require('bcrypt');

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

      let type = this.type;
      let omitForParticular=['password']
      this.fullName = `${_.capitalize(this.firstName)} ${(this.lastName||'').toUpperCase()}`

      switch (type){
          case 'PARTICULAR': return (_.omit(this,omitForParticular));
          case 'ADMIN': return this;
          default : return (_.omit(this,omitForParticular));
      }


    },
    beforeCreate: function (valueSet, cb) {
        nomarlizerName(valueSet)
        // Hash password
        bcrypt.hash(valueSet.password, 10, function (err, hash) {
            console.log("password hashed => ",hash)
            if (err) return cb(err);
            valueSet.password = hash;
            console.log("value set .password after hash =>", valueSet.password)
        });
        cb()
    },
    beforeUpdate: function (valueSet, cb) {
        nomarlizerName(valueSet)
        // Hash password
        bcrypt.hash(valueSet.password, 10, function (err, hash) {
            if (err) return cb(err);
            valueSet.password = hash;
        });
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
