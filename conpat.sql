CREATE DATABASE conpat;
USE conpat;

CREATE TABLE patrimonios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  responsavel VARCHAR(255) NOT NULL,
  dataCadastro DATE NOT NULL,
  matricula VARCHAR(255) NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  movimentacao VARCHAR(50) NOT NULL,
  secretaria VARCHAR(255)
);