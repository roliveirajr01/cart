const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/User');
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcryptjs');
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gestão de usuários e login
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/registro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || typeof nome === undefined || nome === null) {
    return res.status(400).json({ message: 'Nome inválido.' });
  }
  if (!email || typeof email === undefined || email === null) {
    return res.status(400).json({ message: 'Email inválido.' });
  }
  if (!senha || typeof senha === undefined || senha === null) {
    return res.status(400).json({ message: 'Senha inválida.' });
  }

  Usuario.findOne({ email: email })
    .then((usuario) => {
      if (usuario) {
        return res.status(400).json({ message: 'Usuário já existe.' });
      } else {
        const novoUsuario = new Usuario({
          nome: nome,
          email: email,
          senha: senha,
        });

        bcrypt.genSalt(10, (erro, salt) => {
          if (erro) {
            return res.status(400).json({ message: 'Erro ao gerar salt.' });
          }

          bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
            if (erro) {
              return res.status(400).json({ message: 'Erro ao gerar hash da senha.' });
            }

            novoUsuario.senha = hash;

            novoUsuario
              .save()
              .then(() => {
                res.status(201).json({ message: 'Usuário salvo com sucesso.' });
              })
              .catch((e) => {
                res.status(400).json({ message: 'Erro ao salvar usuário: ' + e.message });
              });
          });
        });
      }
    })
    .catch((e) => {
      res.status(400).json({ message: 'Erro ao buscar usuário: ' + e.message });
    });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuarios/login',
    failureFlash: true
  })(req, res, next)
});

router.patch('/login/update', (req,res) => {
  Usuario.findOne({_id: req.body.id}).then((postagem) => {

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

module.exports = router;