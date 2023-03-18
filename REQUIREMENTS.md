# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index: '/products' [GET]
- show: '/products/:id' [GET]
- create: (args: name, price, category)[token required]: '/products' [POST] (token)

#### Users
- index: [token required]: '/users'[GET] (token)
- Show: (args: id) [token required]: '/users/:id'[GET] (token)
- Create: (args: firstName, lastName, email, password)[token required]: '/users/signup'[POST] (token)

#### Orders
- index > getAllOrders: [token required]:'/orders/:user_id'[GET] (token)
- Current > getCurrent: (args: userId)[token required]: '/orders/current/:user_id'[GET] (token)
- create: (args: quantity, status, user_id)[token required]:'/orders'[POST] (token)
- update > updateStatus: (args:status, orderId)[token required]: '/orders'[PUT] (token)
- addProduct: (args:quantity, order_id, product_id)[token required]: '/orders/:id/products'[POST] (token)

## Data Shapes
#### products  Table:

id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price INTEGER NOT NULL,
category VARCHAR(50)

#### users Table:

id SERIAL PRIMARY KEY,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL

#### orders Table:

id SERIAL PRIMARY KEY,
quantity INTEGER,
status VARCHAR(50) NOT NULL,
user_id INTEGER FOREIGN KEY REFERENCES users(id)

### order_products Table: 

id SERIAL PRIMARY KEY,
quantity INTEGER,
order_id INTEGER FOREIGN KEY REFERENCES orders(id),
product_id INTEGER FOREIGN KEY REFERENCES products(id)

