const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error('Invalid email');
      //   }
      // },
    },
    work: {
      type: String,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    logo: {
        type: String,
    },
    review: {
        type: String,
        trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
//  * @returns {Promise<boolean>}
//  */
// companySchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const company = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!company;
// };


/**
 * @typedef User
 */
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
