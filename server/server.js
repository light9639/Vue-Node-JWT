const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

const jwtKey = "ehdgh123";

const members = [
    {
        id: 1,
        name: "이동호",
        loginId: "Lee",
        loginPw: "2580"
    },
    {
        id: 2,
        name: "김영미",
        loginId: "Kim",
        loginPw: "1234"
    }
]

app.get('/api/account', (req, res) => {
    if (req.cookies && req.cookies.token) {
        jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            }

            res.send(decoded);
        })
    }
    else {
        res.sendStatus(401);
    }
})

app.post('/api/account', (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;

    const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);

    if (member) {
        const options = {
            domain: "localhost",
            path: "/",
            httpOnly: true
        };

        const token = jwt.sign({
            id: member.id,
            name: member.name,
        }, jwtKey, {
            expiresIn: "15m",
            issuer: "LeeDongHo"
        });

        res.cookie("token", token, options);
        res.send(member);
    } else {
        res.sendStatus(404);
    }
})

app.delete('/api/account', (req, res) => {
    if (req.cookies && req.cookies.token) {
        res.clearCookie("token");
    }

    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})