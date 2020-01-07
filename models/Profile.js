/**
 **  User Profile Schema
 *
 */
const mongoose = require('mongoose');

const UserProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  website: {
    type: String
  },
  skills: {
    type: [String],
    required: [true, 'Please add skill sets']
  },
  status: {
    type: String,
    required: [true, 'Please add a status']
  },
  company: {
    type: String
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  nocstatus: {
    type: String,
    enum: ['E1', 'Ninja', 'PM'],
    default: 'E1'
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  sociallinks: {
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', UserProfileSchema);
