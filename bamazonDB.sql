DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45),
department_name VARCHAR(45),
price DECIMAL(10,2) NOT NULL,
stock_qty INT NOT NULL,
primary key (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Cat Mouse", "Pets", 5.99, 20);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Catify Wet Food 6oz", "Pets", 2.49, 100);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Lint Roller", "Household", 3.99, 10);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Blanket", "Bed", 15.99, 5);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Bear Plushie", "Kids", 5.99, 10);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Toilet Paper Rolls", "Bathroom", 5.99, 200);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Toothbrush", "Bathroom", 3.49, 20);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Small Lamp", "Household", 6.99, 8);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Stir-fry Pan", "Kitchen", 7.49, 5);
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Whisk", "Kitchen", 3.99, 3);