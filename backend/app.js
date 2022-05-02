const express = require("express")
const path = require("path")
const morgan = require("morgan")
const app = express();
const port = 5000;

app.use([ morgan('tiny') ])


app.get("/", (req, res) => {
    res.status(200);
})

app.all('*', (req, res) => {
    res.status(400).send('<h1>Page not found</h1>');
})

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
}) 