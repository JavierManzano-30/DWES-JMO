function publicAccess(req, res) {
  return res.status(200).json({ message: 'Zona publica: acceso abierto.' });
}

function vipAccess(req, res) {
  const role = req.user?.role || 'vip';
  return res.status(200).json({ message: 'Zona VIP: acceso concedido.', role });
}

function adminAccess(req, res) {
  return res.status(200).json({ message: 'Zona admin: acceso concedido.', role: req.user.role });
}

module.exports = { publicAccess, vipAccess, adminAccess };
