-- MySQL Workbench Synchronization
-- Generated: 2021-02-28 23:20
-- Model: New Model
-- Version: 1.0
-- Project: RestAPI
-- Author: Kaua Vitorio

create database `bdecommerce`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;

-- Use DataBase
use heroku_b1940cca2c26944;
use bdecommerce;
use bdlivraria;

/*	----- Create produtos table  -----  */
CREATE TABLE `produtos` (
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(45) NOT NULL,
  `preco_produto` FLOAT(11) NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

/*	----- Create pedidos table  -----  */
CREATE TABLE `pedidos` (
  `id_pedido` INT(11) NOT NULL AUTO_INCREMENT,
  `id_produto` INT(11) NOT NULL,
  `quantidade` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedidos_produtos_idx` (`id_produto` ASC),
  CONSTRAINT `fk_pedidos_produtos`
    FOREIGN KEY (`id_produto`)
    REFERENCES `heroku_b1940cca2c26944`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

alter  table produtos
add column imagem_produto varchar(500);

/********************************************************/

/*	----- Create user table  -----  */
create table usuarios (
	id_usuario integer not null primary key auto_increment,
    email VARCHAR(120) unique NOT NULL,
    senha VARCHAR(120) NOT NULL
);

ALTER TABLE usuarios ADD UNIQUE (email);
ALTER TABLE usuarios MODIFY COLUMN email VARCHAR(120) NOT NULL;
ALTER TABLE usuarios MODIFY COLUMN senha VARCHAR(120) NOT NULL;
describe usuarios;


insert into produtos(nome_produto, preco_produto)
values ('Harry Potter', 99.60);

/************** INNER JOI Pedidos-Produtos ******************/
SELECT pedidos.id_pedido,
	   pedidos.quantidade,
	   produtos.id_produto,
	   produtos.nome_produto,
	   produtos.preco_produto
	FROM pedidos
INNER JOIN produtos
	ON produtos.id_produto = pedidos.id_produto;
/************** END INNER JOI Pedidos-Produtos ******************/

describe produtos;

/* ---- Select Tabel ---- */
select * from pedidos;
select * from produtos;
select * from usuarios;
show tables;

INSERT INTO produtos(nome_produto, preco_produto, imagem_produto) 
VALUES ("Test pao",10,"https://");
/***************************************************************/
create table `images_produtos` (
id_imagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_produto INT,
caminho varchar(255),
foreign key (id_produto) references produtos (id_produto)
);

select * from images_produtos;

/**************	Refactor database  ******************************/
drop table images_produtos;
drop table produtos;
drop table pedidos;
drop table usuarios;
drop database bdecommerce;
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
    REFERENCES `bdecommerce`.`products` (`productId`)
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

