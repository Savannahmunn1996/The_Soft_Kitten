DROP DATABASE IF EXISTS The_Soft_Kitten;
CREATE DATABASE The_Soft_Kitten;

USE The_Soft_Kitten;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),

);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title Varchar(30),
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);


CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(30),
  last_name VARCHAR(30),
  FOREIGN KEY (role_id)
  REFERENCES role(id)








)