-- Insert a user with username 'user' and password 'password'
-- Passwords must be encoded. The {noop} prefix indicates NoOpPasswordEncoder is used.
INSERT INTO users (username, password, email, active) VALUES ('user', '$2a$10$oFAYe156iIYkFNAbtUomCu0jtbrcdAc87X0DsohXMzEkywC8fnt9W', 'user@gmail.com', TRUE);
-- Insert a user with username 'admin' and password 'adminpass'
INSERT INTO users (username, password, email, active) VALUES ('admin', '$2a$10$DT.kVVOHgFmWURhvwtvpi.vREK1/FRsyfKVl26hrZLaC5lI6lgGAS', 'admin@gmail.com', TRUE);

-- Assign roles/authorities

-- A few products for testing
INSERT INTO products (name, description, price, stock_quantity) VALUES ('Product 1', 'Description for product 1', 19.99, 32);
INSERT INTO products (name, description, price, stock_quantity) VALUES ('Product 2', 'Description for product 2', 29.99, 100);
INSERT INTO products (name, description, price, stock_quantity) VALUES ('Product 3', 'Description for product 3', 9.99, 0);