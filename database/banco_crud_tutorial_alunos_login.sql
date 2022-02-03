create database login;
create database tutorial_web2;

use login;

create table users (
	id int auto_increment primary key,
	username varchar(255),
    login varchar(100),
    userpassword varchar(256)
);

insert into users(username, login, userpassword) values ("lucas", "lucas", "$2a$10$fxiAuDgYPZI8cAvudqryoeNwMwNY9z4EhOBu3vnKolVos90MHAeqq");
insert into users(username, login, userpassword) values ("luan", "luan", "$2a$10$fxiAuDgYPZI8cAvudqryoeNwMwNY9z4EhOBu3vnKolVos90MHAeqq");

select * from users;

create table alunos (
  id int auto_increment primary key,
  nome varchar(255),
  email varchar(255),
  curso varchar(255)
);

INSERT INTO alunos (nome, email, curso) VALUES ('João', 'joao@gmail.com', 'IPI');
INSERT INTO alunos (nome, email, curso) VALUES ('Jose', 'jose@gmail.com', 'IPI');
INSERT INTO alunos (nome, email, curso) VALUES ('Maria', 'maria@gmail.com', 'Qualidade');

select * from alunos;

delete from alunos where id = '6';

use tutorial_web2;