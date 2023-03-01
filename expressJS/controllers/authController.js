const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({
        'message': "username and password required"
    });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(401).json({
        'message': 'Unauthorized'
    });//unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        //saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUSer = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUSer]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken })
    } else {
        res.status(401).json({
            'message': 'Unauthorized'
        });
    }
}

module.exports = {
    handleLogin
};
