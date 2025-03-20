const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/User');
const Usuario = mongoose.model('usuarios');

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      (email, senha, done) => {
        Usuario.findOne({ email: email })
          .select('+senha')
          .then((usuario) => {
            if (!usuario) {
              return done(null, false, { message: 'Esta conta não existe.' });
            }

            if (usuario.status && usuario.status !== 'ativo') {
              return done(null, false, { message: 'Conta desativada.' });
            }

            bcrypt.compare(senha, usuario.senha, (error, batem) => {
              if (batem) {
                const userData = {
                  _id: usuario._id,
                  nome: usuario.nome,
                  email: usuario.email,
                  role: usuario.role || 'user'
                };
                return done(null, userData);
              } else {
                return done(null, false, { message: 'Senha incorreta' });
              }
            });
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id)
      .select('-senha -__v')
      .then((usuario) => {
        if (!usuario) return done(new Error('Usuário não encontrado'));
        done(null, usuario);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};