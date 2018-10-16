'use strict';
// const { DATABASE } = require('../config');
const knex = require('../knex');

// const knex = require('../knex');

// #1 (done) Get All Notes accepts a searchTerm and finds 
// notes with titles which contain the term. It returns an 
// array of objects.

// let searchTerm = 'updated title';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(function (queryBuilder) {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   }); 



// #2 Get Note By Id accepts an ID. It returns the note as an object not an array
// ** Question: how do I return the note as an object?

// let id = 1001;

// knex.select()
//   .from('notes')
//   .where({ id: id })
//   .then(results => {
//     // console.log(JSON.stringify(results, null, 2));
//     console.log(results[0]);
//   })
//   .catch(err => {
//     console.error(err);
//   }); 


// #3 Update Note By Id accepts an ID and an object with the 
// desired updates. It returns the updated note as an object

// let id = 1000;

// /***** Never trust users - validate input *****/
// const updateObj = { title: 'test', content: 'test' };
// const updateableFields = ['title', 'content'];

// knex('notes')
//   .returning()
//   .modify(function (queryBuilder) {
//     if (id) {
//       queryBuilder.where('id', `${id}`);
//     }
//   })
//   .update(updateObj)
//   .then(results => {
//     console.log(results);
//   })
//   .catch(err => {
//     console.error(err);
//   });



// #4 Create a Note accepts an object with the note properties 
// and inserts it in the DB. It returns the new note (including 
// the new id) as an object.

// let newItem = { title: 'new item test', content: 'new content test' };

// knex('notes')
//   .returning()
//   .insert([newItem])
//   .then(results => {
//     console.log(results);
//   });


// #5 Delete Note By Id accepts an ID and deletes the note from the DB.
// let id = 1011;

// knex('notes')
//   .where({ id })
//   .delete()
//   .then(results => {
//     console.log(results);
//   });