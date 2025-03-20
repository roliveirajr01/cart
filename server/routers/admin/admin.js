//TODO: Incluir no swagger o restante das documentacoes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Categories')
const Categorie = mongoose.model("categories")

require('../../models/Product')
const Product = mongoose.model("products")
const upload = require('../../config/upload')
const fs = require('fs'); 
const path = require('path');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestão administrativa de categorias e produtos
 */

/**
 * @swagger
 * /admin/categorias/nova:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - slug
 *             properties:
 *               nome:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro na validação dos dados
 */

router.post('/categorias/nova', (req, res) => {
  const { nome, slug } = req.body;

  if (!nome || !slug) {
    return res.status(400).json({ error: 'Nome e slug são obrigatórios' });
  }

  const novaCategoria = new Categorie({ nome, slug });

  novaCategoria.save()
    .then((savedCategoria) => {
      res.status(201).json({
        message: 'Categoria salva com sucesso',
        id: savedCategoria._id
      });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erro ao salvar categoria: ' + error.message });
    });
});

/**
 * @swagger
 * /admin/categorias/editar/{id}:
 *   get:
 *     summary: Obtém detalhes de uma categoria para edição
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da categoria
 *       400:
 *         description: Categoria não encontrada
 */

router.get('/categorias/editar/:id', (req, res) => {
  Categorie.findOne({ _id: req.params.id }).lean().then((categoria) => {
    res.status(200).json({ categoria });
  }).catch((error) => {
    res.status(400).json({ message: 'Categoria não encontrada'+error });
  });
});

/**
 * @swagger
 * /admin/categorias/deletar:
 *   post:
 *     summary: Deleta uma categoria
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria deletada com sucesso
 *       400:
 *         description: Erro ao deletar categoria
 */

router.post('/categorias/deletar', (req, res) => {
  Categorie.deleteOne({_id: req.body.id}).then(() => {
    res.status(201).json({ message: 'Categoria deletada' });
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao deletar categoria '+e });
  })
})

router.get('/produto/add', (req, res) => {
  Categorie.find().lean().then((categorias) => {
    res.status(200).json({ categorias: categorias });
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao adicionar postagem ' + e });
  });
});

/**
 * @swagger
 * /admin/produto/novo:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Admin]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - categoria
 *               - titulo
 *               - imagem
 *             properties:
 *               titulo:
 *                 type: string
 *               slug:
 *                 type: string
 *               descricao:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               preco:
 *                 type: number
 *               imagem:
 *                 type: string
 *                 format: binary
 *               isVegetariano:
 *                 type: boolean
 *               isSemGluten:
 *                 type: boolean
 *               avaliacao:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro na validação dos dados
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/produto/novo', upload.single('imagem'), (req, res) => {
  if (req.body.categoria === "0") {
    return res.status(400).json({ 
      error: 'Selecione uma categoria válida' 
    });
  }

  if (!req.file) {
    return res.status(400).json({
      error: 'Imagem do produto é obrigatória'
    });
  }

  const newProduct = new Product({
    titulo: req.body.titulo,
    slug: req.body.slug,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    categoria: req.body.categoria,
    preco: req.body.preco,
    imagem: `/uploads/dishes/${req.file.filename}`,
    avaliacao: req.body.avaliacao || 0
  });

  newProduct.save()
    .then(() => {
      res.status(201).json({
        success: 'Produto cadastrado com sucesso!',
        imagemUrl: newProduct.imagem
      });
    })
    .catch((error) => {
      if (req.file) {
        const fullPath = path.join(__dirname, '../public', newProduct.imagem);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      res.status(500).json({
        error: 'Erro ao salvar produto: ' + error.message
      });
    });
});

router.get('/produto/edit/:id', (req, res) => {

  Product.findOne({_id: req.params.id}).lean().then((postagem) =>{
    Categorie.find().lean().then((categorias) => {
      res.status(200).json({categorias: categorias, postagem: postagem})
    }).catch((e) => {
      res.status(400).json({ message: 'Erro ao listar categorias: ' + e.message });
    })
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao editar postagem: ' + e.message });
  })
  
})

router.post('/produto/edit', (req,res) => {
  Product.findOne({_id: req.body.id}).then((postagem) => {

    postagem.titulo = req.body.titulo,
    postagem.slug = req.body.slug,
    postagem.descricao = req.body.descricao,
    postagem.conteudo = req.body.conteudo,
    postagem.categoria = req.body.categoria,
    postagem.preco = req.body.preco,
    postagem.imagem = req.body.imagem,
    postagem.avaliacao = req.body.avaliacao,

    postagem.save().then(() => {
      res.status(200).json({ message: 'Postagem editada com sucesso.' });
    })
  }).catch((e) => {
    res.status(400).json({ message: 'Houve um erro ao salvar a edição: ' + e.message });
  })
})

router.get('/produto/deletar/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Produto deletado com sucesso.'});
    })
    .catch((e) => {
      res.status(401).json({ message: 'Produto deletado com sucesso:' +  e.message});
    });
});

module.exports = router;

