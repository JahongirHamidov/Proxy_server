const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public'))) 


app.get('/', (req,res) => {
    res.sendFile('/index.html')
})
 
const PORT = 5000
app.listen(PORT, () => {console.log('app running ...')})