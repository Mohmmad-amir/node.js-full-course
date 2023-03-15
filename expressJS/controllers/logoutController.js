const User = require('../models/User')


const handleLogout = async (req, res) => {
    // on client, also delete accessToken

    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(204); // no content
    const refreshToken = cookies.token;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' })
        return res.sendStatus(204);// forbidden
    }
    // delete refreshToken
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' }); // secure
    res.sendStatus(204);
    console.log(result);
}

module.exports = {
    handleLogout
}
