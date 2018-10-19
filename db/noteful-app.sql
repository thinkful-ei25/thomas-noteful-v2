-- psql -U dev -d noteful-app -f ~/Desktop/thinkful-ei/projects/week_4/noteful-app-v2/db/noteful-app.sql
-- psql -U dev -d noteful-test -f ./db/noteful-app.sql
DROP TABLE IF EXISTS notes_tags, tags, notes, folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE
);

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;
ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO tags (name) VALUES 
  ('tag one'),
  ('tag two'),
  ('tag three'),
  ('tag four');

INSERT INTO folders (name) VALUES
  ('Archive'), 
  ('Drafts'),
  ('Personal'),
  ('Work');

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '5 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    'What the government doesn''t want you to know about cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    102
  ),
  (
    'The most boring article about cats you''ll ever read',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    103
  ),
  (
    '7 things lady gaga has in common with cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    'The most incredible article about cats you''ll ever read',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '10 ways cats can help you live to 100',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '9 reasons you can blame the recession on cats',
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '10 ways marketers are making you addicted to cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    '11 ways investing in cats can make you a millionaire',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  ),
  (
    'Why you should forget everything you learned about cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    100
  );

INSERT INTO notes_tags (note_id, tag_id) VALUES
  (1000, 1),
  (1001, 2),
  (1002, 3),
  (1003, 1),
  (1003, 2),
  (1003, 3),
  (1004, 1),
  (1004, 2);

-- -- get all notes
-- SELECT * FROM notes;

 
   