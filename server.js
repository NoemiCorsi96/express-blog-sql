const express = require('express')
const app = express()
const db = require('./data/db.js');
const port = 3000
const postsRouter = require("./routers/posts.js");
const serverError = require("./middleware/serverError.js");
const notFound = require("./middleware/notFound.js");
app.use(express.static('public'));
//body-parser
app.use(express.json())
app.use("/api/posts", postsRouter)
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


app.get('/', (req, res) => {
    res.send('Server del mio blog')
})


//middleware serverError
app.use(serverError)

//middleware notFound error 404
app.use(notFound)