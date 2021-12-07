const express = require('express')
const app = express()
const path = require('path')
const puppeteer = require('puppeteer')
const replace = require('absolutify')


app.use(express.static(path.join(__dirname, 'public'))) 


app.get('/', (req,res) => {
    res.sendFile('/index.html')
})

app.get('/proxy', async(req,res) => {
    const {url} = req.query

    if(!url) {
        return res.send('Url not found')
    } else {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto(`https://${url}`)

            let document = await page.evaluate(() => document.documentElement.outerHTML)
            document = replace(document, `/proxy?url=${url.split('/')[0]}`)

            await browser.close()
            return res.send(document)
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    }

} )
 
const PORT = 5000
app.listen(PORT, () => {console.log('app running ...')})