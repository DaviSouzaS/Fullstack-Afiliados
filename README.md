# Fullstack Afiliados

>  This is a challenge by [Coodesh](https://coodesh.com/)

### Instruções para rodar o projeto.

#### Rodar com docker (É necessário ter o Docker e o docker-compose instalados).

Cada diretório (front-end e back-end) vai criar um docker container. Basta digitar "docker-compose up" em cada diretório e os containers serão gerados.

#### Rodar na maquina local.

Front-end: Primeiramente "npm install" ou "yarn" para instalar as dependências, depois "npm run dev" ou "yarn dev". 

Back-end: Primeiramente "npm install" ou "yarn" para instalar as dependências, depois configurar o arquivo ".env" com base no ".env.example" e por último rodar "npm start" ou "yarn start". 

#### Rodar testes.

Para rodar os testes digite "npm test" ou "yarn test" no back-end ou no front-end.

# Informações do projeto

Esse projeto foi um teste técnico para um processo seletivo em que estava participando.

O objetivo do projeto é desenvolver uma aplicação web que permita o upload de um arquivo ([sales.txt](sales.txt)) que contém transações de produtos vendidos. após o envio do arquivo, todos os dados devem ser tratados e armazenados em um banco de dados relacional.

Iniciei o desenvolvimento do projeto criando o DER (Diagrama Entidade Relacionamento) e definindo quais tabelas existiriam na aplicação (User table e Transactions table). Após isso, seguindo a proposta do projeto conclui que é necessário existir 4 rotas (criação de usuário (POST), login (POST), registrar transações (POST) e ler todas as transações (GET)), também defini que as rotas de registrar transações e ler todas as transações serão autenticadas.

Para desenvolver o back-end da aplicação, utilizei o docker para conteinerização, o Type script como linguagem de programação, Express como framework, e as bibliotecas: TypeORM, pg, reflect-metadata, bcryptjs, dotenv, express-async-errors, jsonwebtoken, cors, zod e multer, além disso utilizei o banco de dados relacional MySQL.

O registro de transações foi sem dúvida a funcionalidade mais complexa da API. Para registrar todas as transações contidas no arquivo ([sales.txt](sales.txt)) foi necessário inicialmente transformar todo conteúdo do arquivo em uma string, após isso separei cada transação por meio de suas quebras de linha, dessa forma, consegui criar um array em que cada item era uma transação. Apartir disso, fiz um loop no array, tratei todos os dados e os salvei no banco de dados.

Para tratar os dados de forma adequada, segui as tabelas que foram oferecidas no repositório original do teste técnico.

Exemplo: 

12022-01-22T08:59:13-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA

### Formato do arquivo de entrada

| Campo    | Início | Fim | Tamanho | Descrição                      |
| -------- | ------ | --- | ------- | ------------------------------ |
| Tipo     | 1      | 1   | 1       | Tipo da transação              |
| Data     | 2      | 26  | 25      | Data - ISO Date + GMT          |
| Produto  | 27     | 56  | 30      | Descrição do produto           |
| Valor    | 57     | 66  | 10      | Valor da transação em centavos |
| Vendedor | 67     | 86  | 20      | Nome do vendedor               |

### Tipos de transação

Esses são os valores possíveis para o campo Tipo:

| Tipo | Descrição         | Natureza | Sinal |
| ---- | ----------------- | -------- | ----- |
| 1    | Venda produtor    | Entrada  | +     |
| 2    | Venda afiliado    | Entrada  | +     |
| 3    | Comissão paga     | Saída    | -     |
| 4    | Comissão recebida | Entrada  | +     |

Seguindo as tabelas, sei que a transação acima é uma "Venda produtor", de natureza "Entrada", realizada na data 22/01/2022, no horário 08:59, o nome do produto é "DOMINANDO INVESTIMENTOS", o valor da transação foi "0000050000" cinquenta mil centavos, e a vendedora foi a "MARIA CANDIDA". Dessa forma consegui registrar cada transação no banco de dados.

Após finalizar o back-end, criei a [documentação da API](https://davisouzas.github.io/fullstack-afiliados-doc/). A documentação está abrangendo todos os possíveis resultados de cada rota (sucesso e erros), foi escrita totalmente em inglês e é um texto de fácil compreensão. 

Ao finalizar o back-end e sua documentação, iniciei o desenvolvimento do front-end utilizando React, Type script e as bibliotecas: react-router-dom, react-hook-form, @hookform/resolvers, axios, react-icons, zod e tailwindcss. A aplicação possui três páginas (página de login, página de registro e dashboard). 

Após criar uma conta e fazer login, o usuário tem acesso a dashboard onde pode registrar as transações contidas no arquivo [sales.txt](sales.txt). O input só ira aceitar um arquivo ".txt" que siga o modelo de transações determinado pelas tabelas acima, caso contrário, um modal de erro irá aparecer. Se o arquivo enviado pelo usuário seguir o modelo correto, todas as transações serão cadastradas no banco de dados e renderizadas no topo da página. 
