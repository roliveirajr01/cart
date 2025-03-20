module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: 'Não autenticado' });
  },

  isAdmin: (req, res, next) => {
    if (req.user.role === 'admin') return next();
    res.status(403).json({ error: 'Acesso proibido' });
  }
};