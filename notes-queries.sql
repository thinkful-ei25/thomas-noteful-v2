DROP TABLE IF EXISTS notes;

CREATE TABLE notes (

  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created TIMESTAMP WITH TIME ZONE DEFAULT now()
  
  );

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

INSERT INTO notes (title, content) VALUES
  ('title 1', 'content 1'),
  ('title 2', 'content 2'),
  ('title 3', 'content 3'),
  ('title 4', 'content 4'),
  ('title 5', 'content 5'),
  ('title 6', 'content 6'),
  ('title 7', 'content 7'),
  ('cats 8', 'content 8'),
  ('ways 9', 'content 9'),
  ('title 10', 'content 10');

  UPDATE notes SET title='updated title' WHERE title='title 10';


-- #1 Select all the notes

-- SELECT * FROM notes; 



-- #2 Select all the notes and limit by 5

-- SELECT * FROM notes LIMIT 5;



-- #3 Select all the notes and change the sort order. Experiment with 
-- sorting by id, title and date. Try both ascending and descending.

-- SELECT * FROM notes ORDER BY id ASC;
-- SELECT * FROM notes ORDER BY id DESC;
-- SELECT * FROM notes ORDER BY title ASC;
-- SELECT * FROM notes ORDER BY title DESC;
-- SELECT * FROM notes ORDER BY created ASC;
-- SELECT * FROM notes ORDER BY created DESC;



-- #4 Select notes where title matches a string exactly

-- SELECT * FROM notes WHERE title='title 2';
-- SELECT * FROM notes WHERE title='title 9';



-- #5 Select notes where title is LIKE a string. In other words the title 
-- contains the word or phrase (e.g cats or ways)

-- SELECT * FROM notes WHERE title LIKE 'title%';
-- SELECT * FROM notes WHERE title LIKE 'updated%';
-- SELECT * FROM notes WHERE title LIKE 'cats%';
-- SELECT * FROM notes WHERE title LIKE 'ways%';



-- #6 Update the title and content of a specific note.

-- UPDATE notes SET title='updated title #6', content='updated content #6' WHERE id='1000';
-- SELECT * FROM notes;



-- #7 Insert a new note. Try providing incomplete data like missing 
-- content or title fields.

-- INSERT INTO notes (title, content) VALUES
-- ('insert title #1', ''),
-- ('', 'content #2');

-- SELECT * FROM notes;



-- #8 Delete a note by id

-- DELETE FROM notes WHERE id ='1002';
-- DELETE FROM notes WHERE id IN ('1007', '1008', '1009');
-- SELECT * FROM notes;



-- #9 Bonus Challenge: When you create a table with a primary key, Postgres creates 
-- a sequence field to keep track of the next id. Alter the sequence field so that 
-- the IDs start at 1000.

-- ALTER SEQUENCE notes_id_seq RESTART WITH 1000;
-- SELECT * FROM notes;