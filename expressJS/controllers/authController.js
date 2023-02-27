const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({
        'message': "username and password required"
    });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(401).json({
        'message': 'Unauthorized'
    });//unauthorized
    // evaluate password
    const match = bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        res.json({
            'success': `User ${user} is logged in..!`
        })
    } else {
        res.status(401).json({
            'message': 'Unauthorized'
        });
    }
}

module.exports = {
    handleLogin
};
