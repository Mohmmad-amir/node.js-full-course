const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const newRefreshToken = cookies.jwt;
    console.log(newRefreshToken);

    const foundUser = usersDB.users.find(person => person.refreshToken === newRefreshToken);
    if (!foundUser) return res.sendStatus(403);// forbidden
    // evaluate jwt
    jwt.verify(
        newRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '45s' }
            );
            res.json({ accessToken })
        }
    )
}

module.exports = {
    handleRefreshToken
}
