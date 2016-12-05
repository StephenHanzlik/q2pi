CREATE TABLE users
(
  id INT NOT NULL,
  username INT NOT NULL,
  password INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE files
(
  id INT NOT NULL,
  name INT NOT NULL,
  path INT NOT NULL,
  category INT NOT NULL,
  created_at INT NOT NULL,
  updated_at INT NOT NULL,
  users_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE chat_logs
(
  id INT NOT NULL,
  path INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE chat_logs_users
(
  id INT NOT NULL,
  chat_logs_id INT NOT NULL,
  users_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (chat_logs_id) REFERENCES chat_logs(id),
  FOREIGN KEY (users_id) REFERENCES users(id)
);
