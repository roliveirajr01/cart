const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Usuarios = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: false
  },
  numeroEndereco: {
    type: String,
    required: false
  },
  cpf: {
    type: Number,
    required: false
  },
  genero: {
    type: String,
    required: false
  },
  isAdmin: { 
    type: Number,
    default: 0
  },

})

mongoose.model('usuarios', Usuarios)