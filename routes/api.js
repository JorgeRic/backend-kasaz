'use strict';

const express = require('express');
const router = express.Router();
const HousesDB = require('../models/House');

router.get('/houses', async (req, res, next) => {
  const page = parseInt(req.query.page)
  const per_page = parseInt(req.query.per_page);
  const skip = per_page * (page - 1)
  console.log(req.query, [page, per_page, skip])

  try {

    let listOfHouses = await HousesDB.find().limit(per_page).skip(skip).sort({price: 1})
    let numHouses = await HousesDB.find().count()
    res.json({listOfHouses, numHouses});
  } catch (error) {
    next(error);
  }
});

router.post('/houses/new', async (req, res, next) => {
  const newHouse = req.body;
  try {
    const createdHouse = await HousesDB.create(newHouse);
    res.status(200).json(createdHouse);
  } catch (error) {
    next(error);
  }
});

router.put('/houses/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const hoseupdated = req.body;
  try {
    const updated = await HousesDB.findByIdAndUpdate(id, hoseupdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/houses/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await HousesDB.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vivienda eliminada' });
  } catch (error) {
    next(error);
  }
});

router.get('/houses/:id/details', async (req, res, next) => {
  const { id } = req.params;
  try {
    const detail = await HousesDB.findById(id);
    res.status(200).json(detail);
  } catch (error) {
    next(error);
  }
});

router.post('/houses/search', async (req, res, next) => {
  try {
    const query = {};
    for (const key in req.body) {
      console.log(req.body)
      if (req.body[key]) {
        //Si esta relacionado con el precio
        if (key === 'priceMin'){
          if (query.price) {
            query.price.$gte = req.body.priceMin
          } else {
            query.price = {$gte: req.body.priceMin}
          }
        }
        if (key === 'priceMax'){
          if (query.price) {
            query.price.$lte = req.body.priceMax
          } else {
            query.price = {$lte: req.body.priceMax}
          }
        }
        if (key === 'metersMin'){
          if (query.meters) {
            query.meters.$gte = req.body.metersMin
          } else {
            query.meters = {$gte: req.body.metersMin}
          }
        }
        if (key === 'metersMax'){
          if (query.meters) {
            query.meters.$lte = req.body.metersMax
          } else {
            query.meters = {$lte: req.body.metersMax}
          }
        }
        if(key === 'numBedrooms'){
          query.numBedrooms = {$gte: req.body.numBedrooms }
        }
      }
      
    }

    const refer = await HousesDB.find(query);
    res.status(200).json(refer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
