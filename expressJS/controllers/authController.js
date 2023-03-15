const User = require('../models/User')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ username: user }).exec()
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        const roles = Object.values(foundUser.roles);

        // create JWTs
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };