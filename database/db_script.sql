-- MySQL Workbench Synchronization
-- Generated: 2021-02-28 23:20
-- Model: New Model
-- Version: 1.0
-- Project: RestAPI
-- Author: Kaua Vitorio

/**************	Refactor database  ******************************/

create database `heroku_b1940cca2c26944`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;
drop database heroku_b1940cca2c26944;
use heroku_b1940cca2c26944;

/* ---- Select Tables ---- */
select * from pedidos;
select * from produtos;
select * from usuarios;
show tables;
/****************************************************************************************************/

-- Products table
CREATE TABLE `products` (
  `productId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT(11) NOT NULL,
  `productImage` varchar(500),
  PRIMARY KEY (`productId`))
DEFAULT CHARACTER SET = utf8;

--  Orders table
CREATE TABLE `orders` (
  `orderId` INT(11) NOT NULL AUTO_INCREMENT,
  `productId` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`orderId`),
    FOREIGN KEY (`productId`)
    REFERENCES `heroku_b1940cca2c26944`.`products` (`productId`)
)
DEFAULT CHARACTER SET = utf8;

--  Users table
create table users (
	userId integer not null primary key auto_increment,
    email VARCHAR(120) unique NOT NULL,
    password VARCHAR(125) NOT NULL
);

select * from users;

--  Products Images table
create table `productImages` (
imageId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
productId INT,
path varchar(255),
foreign key (productId) references products (productId)
);
/******************************************************************/

