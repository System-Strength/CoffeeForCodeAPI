-- MySQL Workbench Synchronization
-- Generated: 2021-03-7 23:20
-- Model: Coffee For Code
-- Version: 1.1
-- Project: Sync with restAPI by SystemStrength
-- Author: SystemStrength

/****** Comandos abaixo devem ser utilizados apenas em conexao direta com a api  ******/
drop database heroku_88863b9257990d2;

create database `heroku_88863b9257990d2`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;


use heroku_88863b9257990d2;

/******	Para test local utilizar os comandos a baixo ******/
drop database db_cfc;
create database `db_cfc` DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;
use db_cfc;
/**********************************************************************************/

create table tbl_account(
    id_user int primary key auto_increment,
    email varchar(256) not null,
    nm_user varchar(60) not null,
    cpf_user varchar(14) not null,
    phone_user VARCHAR(15) ,
    address_user varchar(300),
    img_user varchar(300),
    password varchar(256) not null,
    partner int(1) DEFAULT 0
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;


create table tbl_category(
    cd_cat int primary key auto_increment,
    nm_cat varchar(50) not null
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;


create table tbl_menu(
    cd_prod int primary key auto_increment,
    img_prod varchar(300) not null,
    nm_prod varchar(100) not null,
    price_prod decimal(10, 2) not null,
    qntd_prod int not null,
    cd_cat int not null,
    date_prod date,
    popular int(1),
    FOREIGN KEY(cd_cat) REFERENCES tbl_category (cd_cat)
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

DROP table tbl_menu;

create table tbl_purchase(
    cd_purchase int primary key auto_increment,
    cpf_user varchar(14), 
    address_user varchar(50),
    HomeNumber_user varchar(40),
    apt_block_user varchar(10),
    PayFormat_user varchar(20) not null
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

create table tbl_WorkWithUS(
    cd_user int not null primary key auto_increment,
    nm_user varchar(50) not null,
    phone_user varchar(20) not null,
    email_user varchar(40) not null
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;


create table tbl_manager(
    nm_manager varchar(50) not null,
    cpf_manager varchar(14) not null,
    password_manager varchar(12)  primary key not null
) DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

create table tbl_employees(
    id_employees int primary key auto_increment,
    nm_employees varchar(50) not null,
    cg_employees varchar(50) not null,
    email_employees varchar(40) not null,
    cpf_employees varchar(14) not null,
    addres_employees varchar(50) not null,
    phone_employees varchar(15) not null
) DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

/*
create table tbl_partners(
    cd_parc int not null primary key auto_increment,
    nm_parc varchar(50) not null,
    empresa_parc varchar(50) not null,
    cnpj_parc varchar(17) not null,
    email_parc varchar(40) not null,
    site_parc varchar(40),
    end_parc varchar(50),
    tel_parc varchar(30) not null,
    redeSocial_parc varchar(40),
    descr_parc varchar(2000)
); */



/******************** Inserts ********************/
insert into tbl_category (nm_cat) values ("Café");
insert into tbl_category (nm_cat) values ("Chocolate");
insert into tbl_category (nm_cat) values ("MilkShake");
insert into tbl_category (nm_cat) values ("Sanduíche");
insert into tbl_category (nm_cat) values ("Cookies");
insert into tbl_category (nm_cat) values ("Hambúrguer");

/******************** Selects  ********************/
select * from tbl_account;
select * from tbl_employees;
select * from tbl_menu;
select * from tbl_category;

