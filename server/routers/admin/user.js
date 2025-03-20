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
 * /admin/registro:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro na validação dos dados
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

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuarios/login',
    failureFlash: true
  })(req, res, next)
})

module.exports = router;