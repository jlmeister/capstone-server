DROP TABLE IF EXISTS users, addresses, users_addresses;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  dob VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (id)
);

-- CREATE TABLE users_addresses (
--   id INT NOT NULL AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   address_id INT NOT NULL,
--   is_shipping BOOLEAN,
--   is_billing BOOLEAN,
--   is_primary_shipping BOOLEAN,
--   PRIMARY KEY (id),
--   FOREIGN KEY (user_id)
--   REFERENCES users (id),
--   FOREIGN KEY (address_id)
--   REFERENCES addresses (id)
-- );

CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  primary_number VARCHAR(50),
  street_name VARCHAR(50),
  street_suffix VARCHAR(50),
  secondary_designator VARCHAR(15),
  secondary_number VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(50),
  zip VARCHAR(50),
  plus4code CHAR(4),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
);