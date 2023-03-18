/* Create table orders */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    status VARCHAR(50) NOT NULL,
    user_id INTEGER, 

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);