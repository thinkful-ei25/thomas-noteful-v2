'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

// Get All Folders 
router.get('/', (req, res, next) => {
  knex.select()
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex.select()
    .from('folders')
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

// Update Folder The noteful app does not use this endpoint but we'll 
// create it in order to round out our API
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
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

// Create a Folder accepts an object with a name and inserts it in the DB. 
// Returns the new item along the new id.

router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newFolder = { name };
  /***** Never trust users - validate input *****/
  if (!newFolder.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .returning()
    .insert([newFolder])
    .then(item => {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    })
    .catch(err => next(err));
});

// Delete Folder By Id accepts an ID and deletes the folder from the DB 
// and then returns a 204 status.

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where({ id })
    .delete()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

module.exports = router;