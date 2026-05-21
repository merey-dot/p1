
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'Нет токена' })
    }
    try {
        const payload = jwt.verify(token, 'secretKey')
        req.user = { id: payload.id, role: payload.role }
        next()
    } catch (e) {
        res.status(401).json({ error: 'Неверныи токен' })
    }
}
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Доступ запрещен требуется права администратора' })
    }
    next()

}
module.exports = { auth, requireAdmin }