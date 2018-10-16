-- psql -U dev -d noteful-app -f ~/Desktop/thinkful-ei/projects/week_4/project/noteful-app.sql

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (

  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created TIMESTAMP WITH TIME ZONE DEFAULT now()
  
  );



INSERT INTO notes (title, content) VALUES
  ('title 1', 'content 1'),
  ('title 2', 'content 2'),
  ('gaga', 'content 3'),
  ('title 4', 'content 4'),
  ('title 5', 'content 5'),
  ('title 6', 'content 6'),
  ('title 7', 'content 7'),
  ('cats 8', 'content 8'),
  ('ways 9', 'content 9'),
  ('title 10', 'content 10');

  UPDATE notes SET title='updated title' WHERE title='title 10';
   