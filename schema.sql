DROP DATABASE IF EXISTS BamazonDB;
CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30),
product_kind VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(4, 2),
stock_quantity INTEGER(30),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Desert boot", "Clarks", "Shoes", 130.00, 1000);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Original 2-eye","Sperry Top-Sider", "Shoes", 109.00, 500);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Old Skool","Vans", "Shoes", 60.00, 500);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Espadrilles", "Saint Laurent", "Shoes", 495.00, 500);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Leather brogues", "Burberry", "Shoes", 456.00, 100);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Lace-up leather oxfords", "Tod's", "Shoes", 425.00, 100);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Duke Chelsea boots", "Thrusday Boots", "Shoes", 199.00, 50);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Gel Lyte V", "Asics", "Shoes", 145.00, 100);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Aquatalia", "Chealsea", "Shoes", 450.00, 50);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Hunter", "Chelsea", "Shoes", 113.00, 20);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("93/17 Gore-Tex Sneaker", "Adidas", "Shoes", 180.00, 20);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Dalton Wingtip Boot", "Allen Edmonds", "Shoes", 445.00, 40);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Jura Boots","A.P.C.", "Shoes", 545.00, 10);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ("Caldecott Boots", "Church's", "Shoes", 479.00, 10);