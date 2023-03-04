const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    // on client, also delete accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const newRefreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === newRefreshToken);
    if (!foundUser) {
        res.clearCookies('jwt', { httpOnly: true, secure: true, sameSite: 'None' })
        return res.sendStatus(204);// forbidden
    }
    // delete refreshToken
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, newRefreshToken: "" }
    usersDB.setUsers([...otherUsers, foundUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookies('jwt', { httpOnly: true, secure: true, sameSite: 'None' }); // secure
    res.sendStatus(204);
}

module.exports = {
    handleLogout
}
