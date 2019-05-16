CREATE TAbLE lists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  created DATETIME,
  modified DATETIME
) CHARSET=utf8mb4;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  body VARCHAR(256) NOT NULL,
  created DATETIME,
  modified DATETIME,
  state boolean DEFAULT false,
  list_id INT NOT NULL,
  FOREIGN KEY list_key(list_id) REFERENCES lists(id)
) CHARSET=utf8mb4;
