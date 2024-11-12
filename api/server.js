require('dotenv').config();
const express = require('express')
const cors = require("cors")
const tasks = require('./routes/routes')
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/ethereum', tasks)

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server Running At PORT ${PORT}`)
})
