const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (!user) console.log("No user found")
            else {
                const token = jwt.sign({userId: user._id}, process.env.JWT_KEY, {expiresIn: '24h'});
                res.json({
                    token,
                    user,
                });
            }
        })
}

exports.createUser = (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword)
        console.log("Password and confirm password are different")
    else {
        User.findOne({username: req.body.username})
            .then((user) => {
                if (user) console.log("Username already taken");
                else {
                    const user = new User({
                        username: req.body.username,
                        password: req.body.password
                    });
                    user.save()
                        .then((saved) => res.status(200).json(saved))
                        .catch(() => res.status(500).json({message: 'Error during creating user'}))
                }
            })
    }
}

exports.logout = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg : 'You have been logged out' });
        } else {
            res.send({msg: err});
        }
    });
}
