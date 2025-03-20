const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/User');
const User = mongoose.model('usuarios');
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

  User.findOne({ email: email })
    .then((usuario) => {
      if (usuario) {
        return res.status(400).json({ message: 'Usuário já existe.' });
      } else {
        const newUser = new User({
          nome: nome,
          email: email,
          senha: senha,
          role: 'user'
        });

        bcrypt.genSalt(10, (erro, salt) => {
          if (erro) {
            return res.status(400).json({ message: 'Erro ao gerar salt.' });
          }

          bcrypt.hash(newUser.senha, salt, (erro, hash) => {
            if (erro) {
              return res.status(400).json({ message: 'Erro ao gerar hash da senha.' });
            }

            newUser.senha = hash;

            newUser
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
  User.findOne({_id: req.body.id}).then((user) => {

  user.endereco = req.body.endereco
  user.numeroEndereco = req.body.numeroEndereco
  
    
    user.save().then(() => {
      res.status(200).json({ message: 'Usuario editado com sucesso.' });
    })
  }).catch((e) => {
    res.status(400).json({ message: 'Houve um erro ao salvar a edição: ' + e.message });
  })
})
/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     summary: Encerra a sessão do usuário
 *     tags: [Autenticação]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao destruir sessão:', err);
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout bem-sucedido' });
    });
  });
});
module.exports = router;