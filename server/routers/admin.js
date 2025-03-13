const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria')
const Categoria = mongoose.model("categorias")

require('../models/Postagem')
const Postagens = mongoose.model("postagens")
const upload = require('../config/upload')
const fs = require('fs'); 
const path = require('path');


router.get('/post', (req, res) => {
  res.send('Página de post');
});

router.get('/categorias', (req, res) => {
  Categoria.find()
    .lean()
    .sort({ date: 'desc' })
    .then((categorias) => {
      res.status(200).json({ categorias });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.post('/categorias/nova', (req, res) => {
  const { nome, slug } = req.body;

  if (!nome || !slug) {
    return res.status(400).json({ error: 'Nome e slug são obrigatórios' });
  }
  const novaCategoria = new Categoria({ nome, slug });

  novaCategoria.save()
    .then(() => {
      res.status(201).json({ message: 'Categoria salva com sucesso' });
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erro ao salvar categoria: ' + error.message });
    });
});

router.get('/categorias/editar/:id', (req, res) => {
  Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
    res.status(200).json({ categoria });
  }).catch((error) => {
    res.status(400).json({ message: 'Categoria não encontrada'+error });
  });
});

router.post('/categorias/deletar', (req, res) => {
  Categoria.deleteOne({_id: req.body.id}).then(() => {
    res.status(201).json({ message: 'Categoria deletada' });
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao deletar categoria '+e });
  })
})

router.get('/postagens', (req, res) => {
  Postagens.find()
    .lean()
    .populate("categoria")
    .sort({ date: "desc" })
    .then((postagens) => {
      res.status(200).json({ postagens });
    })
    .catch((e) => {
      console.error(e);
      res.status(400).render('admin/erro', { mensagem: 'Erro ao carregar postagens.' });
    });
});

router.get('/postagens/add', (req, res) => {
  Categoria.find().lean().then((categorias) => {
    res.status(200).json({ categorias: categorias });
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao adicionar postagem ' + e });
  });
});

router.post('/prato/novo', upload.single('imagem'), (req, res) => {
  if (req.body.categoria === "0") {
    return res.status(400).json({ 
      error: 'Selecione uma categoria válida' 
    });
  }

  if (!req.file) {
    return res.status(400).json({
      error: 'Imagem do prato é obrigatória'
    });
  }

  const novoPrato = new Postagens({
    titulo: req.body.titulo,
    slug: req.body.slug,
    descricao: req.body.descricao,
    conteudo: req.body.conteudo,
    categoria: req.body.categoria,
    preco: req.body.preco,
    imagem: `/uploads/dishes/${req.file.filename}`,
    isVegetariano: req.body.isVegetariano === 'true',
    isSemGluten: req.body.isSemGluten === 'true',
    avaliacao: req.body.avaliacao || 0
  });

  novoPrato.save()
    .then(() => {
      res.status(201).json({
        success: 'Prato cadastrado com sucesso!',
        imagemUrl: novoPrato.imagem
      });
    })
    .catch((error) => {
      if (req.file) {
        const fullPath = path.join(__dirname, '../public', novoPrato.imagem);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      res.status(500).json({
        error: 'Erro ao salvar prato: ' + error.message
      });
    });
});

router.get('/postagens/edit/:id', (req, res) => {

  Postagens.findOne({_id: req.params.id}).lean().then((postagem) =>{
    Categoria.find().lean().then((categorias) => {
      res.status(200).json({categorias: categorias, postagem: postagem})
    }).catch((e) => {
      res.status(400).json({ message: 'Erro ao listar categorias: ' + e.message });
    })
  }).catch((e) => {
    res.status(400).json({ message: 'Erro ao editar postagem: ' + e.message });
  })
  
})

router.post('/postagens/edit', (req,res) => {
  Postagens.findOne({_id: req.body.id}).then((postagem) => {

    postagem.titulo = req.body.titulo,
    postagem.slug = req.body.slug,
    postagem.descricao = req.body.descricao,
    postagem.conteudo = req.body.conteudo,
    postagem.categoria = req.body.categoria,
    postagem.preco = req.body.preco,
    postagem.imagem = req.body.imagem,
    postagem.isVegetariano = req.body.isVegetariano,
    postagem.isSemGluten = req.body.isSemGluten,
    postagem.avaliacao = req.body.avaliacao,

    postagem.save().then(() => {
      res.status(200).json({ message: 'Postagem editada com sucesso.' });
    })
  }).catch((e) => {
    res.status(400).json({ message: 'Houve um erro ao salvar a edição: ' + e.message });
  })
})

router.get('/postagens/deletar/:id', (req, res) => {
  Postagens.deleteOne({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Postagem removida com sucesso.');
      res.redirect('/admin/postagens');
    })
    .catch((e) => {
      req.flash('error_msg', 'Erro ao remover a postagem: ' + e.message);
      res.redirect('/admin/postagens');
    });
});

module.exports = router;