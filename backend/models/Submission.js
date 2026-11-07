const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'ሙሉ ስም ያስፈልጋል'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'አድራሽ ያስፈልጋል'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'ስልክ ቁጥር ያስፈልጋል'],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: [true, 'የንግድ ባንክ አካዉንት ቁጥር ያስፈልጋል'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', SubmissionSchema);
