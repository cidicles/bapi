'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locales = ['en_us'];
const currencyTypes = ['usd','cad'];
const statusTypes = ['unresolved','resolved'];
const mongoosePaginate = require('mongoose-paginate');

const Bet = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the bet'
  },
  creator: {
    type: String,
    required: 'Please enter the creator of the bet'
  },
  recipient: {
    type: String,
    required: 'Please enter the recipient of the bet'
  },
  amount: {
    type: Number,
    required: 'Please enter the amount of the bet'
  },
  status: {
    type: [{
      type: String,
      enum: statusTypes
    }],
    default: ['unresolved']
  },
  currency: {
    type: [{
      type: String,
      enum: currencyTypes
    }],
    default: ['usd'],
    required: 'Please enter the currency type of the bet'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  locale: {
    type: [{
      type: String,
      enum: locales
    }],
    default: ['en_us'],
    required: 'Please enter the locale of the bet'
  }
}, {
  usePushEach: true
});

Bet.plugin(mongoosePaginate);

module.exports = mongoose.model('Bet', Bet);
