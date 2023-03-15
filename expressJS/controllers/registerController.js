const User = require('../models/User')

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({
        'message': "username and password required"
    });
    // check for duplicate username is the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({
        'message': `user ${user} already exists`
    }); // conflict

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // * create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPassword
        });

        console.log(result);
        res.setHeader('Application/json');
        res.status(201).json({ 'success': `New user ${user} created..!` })
        console.log(usersDB.users);
    } catch (err) {
        res.status(500).json({
            'message': err.message
        })
    }
}

module.exports = {
    handleNewUser
}

