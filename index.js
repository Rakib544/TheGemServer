const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello I am now working on TheGem Restaurant Project')
})

app.listen(8080)