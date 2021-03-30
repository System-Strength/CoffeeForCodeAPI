-- MySQL Workbench Synchronization
-- Generated: 2021-03-7 23:20
-- Model: Coffee For Code
-- Version: 1.1
-- Project: Sync with restAPI by SystemStrength
-- Author: SystemStrength

/****** Comandos abaixo devem ser utilizados apenas em conexao direta com a api  ******/
-- drop database heroku_88863b9257990d2;

-- create database `heroku_88863b9257990d2`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;


use heroku_88863b9257990d2;

/******	Para test local utilizar os comandos a baixo ******/
drop database db_cfc;
create database `db_cfc` DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;
use db_cfc;
/**********************************************************************************/

create table tbl_account(
    id_user int primary key auto_increment,
    email varchar(256) not null,
    nm_user varchar(100) not null,
    cpf_user varchar(14) not null,
    phone_user VARCHAR(15) ,
    zipcode varchar(9),
    address_user varchar(300),
    complement varchar(100),
    img_user varchar(300),
    password varchar(356) not null,
    partner int(1) DEFAULT 0,
    partner_Startdate date
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

create table tbl_category(
    cd_cat int primary key auto_increment,
    nm_cat varchar(50) not null,
    img_cat varchar(50)
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;

create table tbl_menu(
    cd_prod int primary key auto_increment,
    img_prod varchar(200) not null,
    nm_prod varchar(100) not null,
    price_prod decimal(12, 2) not null,
    qntd_prod int not null,
    size varchar(230),
    bonusDesc varchar(210),
    cd_cat int not null,
    nm_cat varchar(50),
    date_prod date,
    popular int(1) default 0,

    FOREIGN KEY(cd_cat) REFERENCES tbl_category (cd_cat)
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;


alter table tbl_menu modify column size varchar(110);
update  tbl_menu set qntd_prod = 150 where cd_prod = 3;
select * from tbl_menu;

DROP table tbl_menu;

create table tbl_shoppingcart(
	id_user int not null,
    email_user varchar(256) not null,
    cd_prod int not null,
    nm_prod varchar(100) not null,
    img_prod varchar(200) not null,
    qt_prod int not null,
    price_unit_prod float not null,
    full_price_prod float not null,
    FOREIGN KEY(cd_prod) REFERENCES tbl_menu (cd_prod)
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;
select * from tbl_shoppingcart;
insert into tbl_shoppingcart (id_user, email_user, cd_prod, nm_prod, img_prod, qt_prod, price_unit_prod, full_price_prod) values (1,"kauavitorioof@gmail.com", 4, "Pao", "aaa", 
20, 1.20, 80.10);
select * from tbl_shoppingcart where email_user = "kauavitorioof@gmail.com";
update tbl_shoppingcart set qt_prod = 99 where cd_prod = 3;

create table tbl_orders (
    cd_order bigint primary key auto_increment,
    email_user varchar(256) not null REFERENCES tbl_account (email_user),
    zipcode varchar(9) not null,
    address_user varchar(300) not null,
    complement varchar(100),
    cd_prods varchar(200),
    PayFormat_user varchar(20) not null,
    status varchar(50) not null,
    held_in date not null
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;
ALTER TABLE tbl_orders auto_increment=251649;
select * from tbl_orders;

create table tbl_cards(
	cd_card int primary key auto_increment,
    email_user varchar(256) not null,
    flag_card varchar(50) not null,
    number_card varchar(19) not null,
    shelflife_card varchar(5) not null,
    cvv_card varchar(3) not null,
    nmUser_card varchar(60) not null
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

create table tbl_versionMobile(
	cd_version int primary key auto_increment,
    versionName varchar(10) not null,
    versionCode int not null
)DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci;
insert into tbl_versionMobile (versionCode, versionName) values (14,"3.7.1");
update tbl_versionMobile set versionCode = 15, versionName = "3.8.5" where cd_version = 4;
select * from tbl_versionMobile;

/******************* Procedures **********************/
delimiter $$
drop procedure if exists spUpdate_MobileVS;
create procedure spUpdate_MobileVS(
        VversionName varchar(10),
		VversionCode int,
        VcdSersion int
)
begin
		update tbl_versionMobile
        set versionCode = VversionCode,
        versionName = VversionName
        where cd_version = VcdSersion;
        
end $$
delimiter ;
call spUpdate_MobileVS("3.6.7", 11, 1);
select * from tbl_versionMobile;
/***************************************************/


/******************** Inserts ********************/
insert into tbl_account (email, nm_user, cpf_user, password) values ("kauavitorioof@gmail.com", "Kauã Vitorio", "433.000.000-01", "@!Kaua2004");
insert into tbl_account (email, nm_user, cpf_user, password) values ("yuridantaass@gmail.com", "Yuri Dantas", "000.000.000-01", "Yuridantas17");
update tbl_account set nm_user = "Viruto Jones" where id_user = 64;
/******************** Selects  ********************/
select * from tbl_account;
select * from tbl_employees;
select * from tbl_menu;
select * from tbl_category;
select * from tbl_shoppingcart;
select * from tbl_cards;
select * from tbl_orders;

delete from tbl_shoppingcart where id_user = 4 and email_user = 'kauavitorioof@gmail.com';
select * from tbl_account where email = "kauavitorioof@gmail.com";


