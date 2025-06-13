SDM_A3_Motos
API REST desenvolvida em Node.js utilizando Restify, com banco de dados MySQL, para gerenciamento de clientes e motos.

📁 Estrutura do Projeto
.
├── controllers/
│   ├── clientesController.js
│   └── motosController.js
├── database/
│   └── connection.js
├── routes/
│   ├── clientes.js
│   └── motos.js
├── server.js
├── package.json
└── README.md
📦 Requisitos
Node.js (versão 16 ou superior)

MySQL Server

🔧 Instalação
Clone o repositório:

git clone <https://github.com/JoaoAraujo92/Sistemas_distribuidos_e_mobile>
cd SDM_A3_Motos
Instale as dependências:

npm install
Configure seu banco de dados MySQL:

Crie o banco de dados:

CREATE DATABASE sdm_a3_motos;
Crie as tabelas clientes e motos conforme a estrutura esperada.

Verifique a conexão com o banco de dados no arquivo:

database/connection.js:

host: 'localhost',
user: 'root',
password: '',
database: 'sdm_a3_motos'▶️ Execução
Execute o servidor com o seguinte comando:

node server.js
O servidor estará disponível em:

http://localhost:8001
📌 Rotas Disponíveis
Clientes
GET /cliente – Lista todos os clientes

GET /cliente/:idProd – Retorna um cliente pelo ID

POST /cliente – Cria um novo cliente

PUT /cliente/:idProd – Atualiza um cliente (substituição completa)

PATCH /cliente/:idProd – Atualiza parcialmente um cliente

DELETE /cliente/:idProd – Deleta um cliente

Motos
GET /moto – Lista todas as motos

GET /moto/:idProd – Retorna uma moto pelo ID

POST /moto – Cria uma nova moto

PUT /moto/:idProd – Atualiza uma moto (substituição completa)

PATCH /moto/:idProd – Atualiza parcialmente uma moto

DELETE /moto/:idProd – Deleta uma moto

💬 Endpoint de Boas-Vindas
GET / – Retorna uma mensagem de boas-vindas

📃 Licença
Projeto acadêmico - sem licença definida.