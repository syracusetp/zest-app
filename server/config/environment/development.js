'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/zestapp-dev'
  },

  seedDB: true,

  force: true
};
