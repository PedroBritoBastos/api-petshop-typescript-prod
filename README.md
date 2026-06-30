# Sobre o projeto

Este projeto é uma API de petshop feita em typescript para fins de estudo. 

# Tecnologias 

- Typescript: para base do código orientado a objetos
- Express: para lidar com as requisições e rotas
- Express-validator: para validar dados e criar senha forte
- Jsonwebtoken (JWT): para criar token de usuário
- Cookie-parser: para salvar token em cookies

# Arquitetura

A arquitetura escolhida para este projeto foi a de desenvolvimento em módulos para facilitar a separação dos domínios. A estrutura de camadas desse projeto foi feita usando o padrão Repository Pattern:

- Controllers -> lidam com as requisições do usuário e devolvem as respostas ao cliente.
- Services -> camada das regras de negócio
- Repository -> camada que se comunica com o banco de dados.

# Banco de Dados

- O banco escolhido foi o SQLite por ser um projeto mais simples e por poder salvar os dados no próprio projeto sem fazer conexão com um banco externo.

# ORM

- Prisma: para facilitar a comunicação com o banco de dados.

- # Entidades

<img width="1052" height="645" alt="image" src="https://github.com/user-attachments/assets/c3631651-f504-40a9-917d-724b1549ad71" />

# Fluxos

<img width="1677" height="510" alt="image" src="https://github.com/user-attachments/assets/9fdd5433-2187-451d-aec4-df4dfcdf7c58" />


# Como usar o projeto

- use: git clone <nome do repositório> main
- instale as dependências (node modules)
- no terminal faça o comando: npm run dev

# Rotas

## Rotas de clientes
<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /clients → resgata todos os clientes
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /clients/:id → resgata um cliente pelo ID
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /clients → cria um novo cliente
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/DELETE-red" alt="DELETE">
    /clients/:id → remove um cliente pelo ID
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /clients/upload/:id → faz upload da foto de um cliente
  </li>
</ul>

## Rotas de pets
<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets → lista todos os pets
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets/available → lista todos os pets disponíveis para adoção
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets/adopted → lista todos os pets adotados
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets/adopted/:clientId → lista os pets adotados por um cliente
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /pets/:petId → resgata um pet pelo ID
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /pets → cria um novo pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/PUT-orange" alt="PUT">
    /pets/:id → atualiza um pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/PUT-orange" alt="PUT">
    /pets/adoption/:id → realiza a adoção de um pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/DELETE-red" alt="DELETE">
    /pets/:id → remove um pet
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /pets/upload/:id → faz upload da foto de um pet
  </li>
</ul>

## Rotas de autorização

<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /auth/login → autentica o usuário
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /auth/logout → encerra a sessão do usuário
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /auth/get → resgata os dados do usuário autenticado
  </li>
</ul>

## Rotas de serviço

<ul>
  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/POST-green" alt="POST">
    /petshopServices → cria um novo serviço
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /petshopServices → lista todos os serviços
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/GET-blue" alt="GET">
    /petshopServices/:clientId → lista os serviços de um cliente
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/PUT-orange" alt="PUT">
    /petshopServices/:id → finaliza um serviço
  </li>

  <li style="display: flex; align-items: center; gap: 8px;">
    <img src="https://img.shields.io/badge/DELETE-red" alt="DELETE">
    /petshopServices/:id → remove um serviço
  </li>
</ul>


