#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE evidence_types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  year INTEGER NOT NULL
);

CREATE TABLE cases (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  game_id INTEGER REFERENCES games(id) NOT NULL
);

CREATE TABLE owners (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  occupation TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE evidences (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  description TEXT,
  type_id INTEGER REFERENCES evidence_types(id) NOT NULL,
  case_id INTEGER REFERENCES cases(id) NOT NULL,
  owner_id INTEGER REFERENCES owners(id) NOT NULL,
  image_url TEXT NOT NULL,
  added DATE DEFAULT CURRENT_DATE
);

INSERT INTO games (name, year)
VALUES
  ('Phoenix Wright: Ace Attorney', 2001),
  ('Phoenix Wright: Ace Attorney - Justice for All', 2002),
  ('Phoenix Wright: Ace Attorney - Trials and Tribulations', 2004),
  ('Apollo Justice: Ace Attorney', 2007),
  ('Ace Attorney Investigations: Miles Edgeworth', 2009),
  ('Ace Attorney Investigations 2: Prosecutor''s Gambit', 2011),
  ('Phoenix Wright: Ace Attorney - Dual Destinies', 2013),
  ('Phoenix Wright: Ace Attorney - Spirit of Justice', 2016);

INSERT INTO evidence_types (name)
VALUES
  ('Articles'),
  ('Documents'),
  ('Information'),
  ('Maps'),
  ('Photographs'),
  ('Reports'),
  ('Statements'),
  ('Weapons'),
  ('Other');

INSERT INTO owners (name, occupation, image_url) 
VALUES
  ('Phoenix Wright', 'Defense Attorney', 'https://static.wikia.nocookie.net/aceattorney/images/7/77/Phoenix_Wright_AJ_Trilogy_SOJ_Mugshot.png/revision/latest?cb=20240420210313'),
  ('Miles Edgeworth', 'Prosecutor', 'https://static.wikia.nocookie.net/aceattorney/images/5/5a/Edgeworthnewshot.png/revision/latest?cb=20241009013733'),
  ('Apollo Justice', 'Defense Attorney', 'https://static.wikia.nocookie.net/aceattorney/images/b/b3/Apollo_Justice_AJ_Trilogy_SOJ_Mugshot.png/revision/latest?cb=20240420214531'),
  ('Athena Cykes', 'Defense Attorney', 'https://static.wikia.nocookie.net/aceattorney/images/0/03/Athena_Cykes_AJ_Trilogy_SOJ_Mugshot.png/revision/latest?cb=20240420205046');
`;

async function main() {
  console.log("seeding...");
  const client = new Client();
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
