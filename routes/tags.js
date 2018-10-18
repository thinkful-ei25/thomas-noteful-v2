'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

/* ========== GET ALL ========== */

router.get('/', (req, res, next) => {
  knex.select()
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET BY ID ========== */ 

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex.select()
    .from('tags')
    .where({ id })
    .then(results => {
      if(!results[0]) {
        const err = new Error('Not Found!');
        err.status = 404;
        return next(err);
      }
      res.json(results[0]);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE ITEM ========== */
router.post('/', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

/* ========== PUT / UPDATE / EDIT ========== */

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('tags')
    .returning()
    .modify(function (query) {
      if (id) {
        query.where('id', `${id}`);
      }
    })
    .update(updateObj)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== DELETE ========== */

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tags')
    .where({ id })
    .delete()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

module.exports = router;