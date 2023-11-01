//Importações
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 
const { sequelize } = require('./models')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

//criando servidor local
const app = express()
const port = process.env.PORT

//Configurando o app.js para usar o cookie parser
app.use(cookieParser())

//Habilitar permições para urls diferentes do backend
/*app.use(cors({
  origin: process.env.CLIENTE_URL,
  credentials: true,
  methods: 'GET, PUT, POST, OPTIONS, DELETE',
}))*/

//Importando o arquivo de navegação pelas rotas (index.js)
const routers = require('./api')

//Configuando para manipular dados JSON
app.use(express.json())

//Configurando para navegar quando a URL padrão for chamada
app.use('/', routers)

//Aviso que a conexão foi bem sucedida
sequelize.sync().then(()=>{
  console.log('conectadado ao banco')
})

// Avisar se o servidor está rodando e em qual porta.
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});
