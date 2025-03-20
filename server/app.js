const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const admin = require('./routers/admin/admin');
const products = require('./routers/users/products');
const categories = require('./routers/users/categories')
const session = require('express-session')
const flash = require('connect-flash')
const app = express();
const userAdmin = require("./routers/users/users")
const passport = require('passport')
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Sistema de Produtos',
      version: '1.0.0',
      description: 'Documentação das APIs para gestão de produtos, categorias e usuários',
    },
    servers: [
      {
        url: 'http://localhost:8081',
      },
    ],
  },
  apis: ['./routers/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./config/auth')(passport)

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: 'cursodenode',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB: ' + error);
  });

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null
  next();
});

app.use('/admin', admin, userAdmin);
app.use('/usuarios', userAdmin);

app.use('/produtos', products);

app.use('/categorias', categories)

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});