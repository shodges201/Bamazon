DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(200) NULL,
department_name VARCHAR(200) NULL,
price DECIMAL(10, 2) NULL,
stock_quantity INT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Xbox One", "Electronics", 244.99, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("PlayStation 4", "Electronics", 269.00, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("2019 Jeep Cherokee", "Cars", 25045.00, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Telescope", "Science", 309.99, 6);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Vans", "Shoes", 80.00, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Yeezy", "Shoes", 300.00, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Loius Vuitton", "Clothing", 120.00, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Old Navy", "Clothing", 20.99, 40);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Microscope", "Science", 149.99, 6);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Jackson Pollack", "Art", 12000.00, 1);
