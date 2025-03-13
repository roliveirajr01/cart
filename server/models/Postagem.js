const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postagem = new Schema({
  titulo: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'categorias',
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  isVegetariano: {
    type: Boolean,
    default: false
  },
  isSemGluten: {
    type: Boolean,
    default: false
  },
  avaliacao: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  data: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('postagens', Postagem)