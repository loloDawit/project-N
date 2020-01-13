/**
 ** NOC Info Schema
 */

const mongoose = require('mongoose');

const NOCInfoSchema = mongoose.Schema({
  IRTemail: [
    {
      p2: {
        type: String
      },
      p1: {
        type: String
      },
      storeIRT: {
        type: String
      }
    }
  ],
  rpos: {
    type: String
  },
  mpos: {
    type: String
  },
  poweroutage: {
    type: String
  },
  worldplayescaltion: {
    type: [String]
  },
  QBlist: {
    type: [String]
  }
});
module.exports = NOCInfoSchema = mongoose.model('NOCInfo', NOCInfoSchema);
