'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['piso', 'chalet', 'planta baja', 'bungalow', 'apartamento', 'atico']
  },
  image: {
    type: [String]
  },
  numBedrooms: {
    type: Number
  },
  numBaths: {
    type: Number
  },
  description: {
    type: String
  },
  meters: {
    type: Number
  },
  city: {
    type: String,
  },
  address: {
    type: String
  },
  important:{
    type: Boolean
  },
  lat: {
    type: String
  },
  long: {
    type: String
  }

});

const HousesDB = mongoose.model('HousesDB', houseSchema);

module.exports = HousesDB;
