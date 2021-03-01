-- MySQL Workbench Synchronization
-- Generated: 2021-02-28 23:20
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Kaua Vitorio

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

create database `bdecommerce`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;
use bdecommerce;
drop database bdecommerce;

CREATE TABLE `produtos` (
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(45) NOT NULL,
  `preco_produto` FLOAT(11) NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `pedidos` (
  `id_pedido` INT(11) NOT NULL AUTO_INCREMENT,
  `id_produto` INT(11) NOT NULL,
  `quantidade` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedidos_produtos_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_produtos`
    FOREIGN KEY (`id_produto`)
    REFERENCES `bdecommerce`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
/********************************************************/
select * from produtos;

insert into produtos(nome_produto, preco_produto)
values ('Harry Potter', 99.60)
