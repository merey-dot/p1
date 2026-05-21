const jwt = require('jsonwebtoken')
const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ error: 'Нет рефреш токена' })
    }
    try {
        const payload = jwt.verify(refreshToken, 'secretKey')
        const newAccessToken = jwt.sign({ id: payload.id }, 'secretKey', { espiresIn: '1h' })
        res.json({ accessToken: newAccessToken })
    } catch (e) {
        res.status(403).json({ error: "Недеиствительныи рефреш токен" })
    }
}
module.exports = { refresh }