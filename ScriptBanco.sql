-- MySQL Workbench Synchronization
-- Generated: 2021-02-28 23:20
-- Model: New Model
-- Version: 1.0
-- Project: RestAPI
-- Author: Kaua Vitorio

create database `bdecommerce`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;

-- Use DataBase
use heroku_b1940cca2c26944;

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

INSERT INTO produtos(nome_produto, preco_produto, imagem_produto) 
VALUES ("Test pao",10,"https://")



