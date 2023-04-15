const Contact = require("../models/Contact.js");
const TiffinForm = require("../models/TiffinForm.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");


const Home = (req, res) => {
    if (req.session.name) {
        return res.render('index', { user: req.session.name });
    }
    else {
        return res.render('index', { user: 'no' });
    }
};

const Login = async (req, res) => {
    if (req.session.name) {
        return res.redirect("/")
    }
    else {

        if (req.method == 'GET') {
            return res.render('login');
        }
        else {
            const { email, password } = req.body;
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.json({ "error": "This Email-Id is not exits. please try with another one. " });
                }
                const compare = bcrypt.compareSync(password, user.password);
                if (!compare) {
                    return res.json({ "error": "Password is not match." })
                }
                req.session.name = user.name;
                req.session.email = email;
                req.session.role = user.role;
                req.session.location = user.location;
                req.session.phone = user.phone;

                return res.redirect("/profile");
            } catch (error) {
                return res.json({ "error": error.message })
            }
        }
    }
}

const Signup = async (req, res) => {
    if (req.session.name) {
        return res.redirect("/")
    }
    else {

        if (req.method == 'GET') {
            return res.render('signup');
        }
        else {
            const { name, email, password, phone } = req.body
            try {
                const a = await User.findOne({ email: email });
                if (a) {
                    return res.json({ "error": "request with this email id already exists. please try with another one." })
                }
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                const data = new User({
                    name, email, password: hash, phone
                });
                const data1 = await data.save();
                return res.redirect("/login");
            } catch (error) {
                return res.send(error);
            }
        }
    }
}

const contact = async (req, res) => {
    if (req.session.name) {
        const a = req.body;
        const data = new Contact(a);
        const data1 = await data.save();
        return res.redirect("/");
    }
    else {
        return res.redirect("/login")
    }
}

const profile = async (req, res) => {
    if (req.session.name) {
        if (req.method == 'GET') {
            const { name, email } = req.session;
            const a = await User.findOne({ email: email });
            req.session.phone = a.phone;
            const obj = {
                name, email, phone: req.session.phone
            }
            res.render("profile", obj);
        }
        else {
            const { name, email } = req.session;
            const { phone } = req.body;
            req.session.phone = phone;
            const a = await User.findOne({ email: email });

            const obj = {
                name, email, phone
            }
            const result = await User.findByIdAndUpdate(a._id, obj);
            return res.redirect('/');
        }

    } else {
        return res.redirect('/login')
    }
}

const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
}

const share = (req, res) => {
    return res.render("share");
}

const Tiffin = async (req, res) => {
    if (req.session.name) {
        role = req.session.role;
        if (role == 'customer') {
            if (req.method == 'GET') {
                const { name, email, phone } = req.session;
                const obj = { name, email, phone, success: false };
                return res.render('TiffinForm.ejs', obj);
            } else {
                const { name, email, phone } = req.session;
                const obj = { name, email, phone, success: true };
                const data = new TiffinForm(req.body);
                const data1 = await data.save();

                return res.render('TiffinForm.ejs', obj)
            }
        }
        else if (role == 'kitchen') {
            location1 = req.session.location;
            console.log(location1)
            const a = await TiffinForm.find({ location: location1 })
            return res.render('kitchen.ejs', { a })
        }
        else if (role == 'admin') {
            const a = await TiffinForm.find()
            return res.render('kitchen.ejs', { a })
        }
        else {
            return res.render('login.ejs')
        }
    } else {
        return res.redirect('/login')
    }

}

const policy = (req, res) => {
    return res.render("policy")
}

module.exports = { Home, Login, Signup, contact, profile, logout, Tiffin, share, policy }; 