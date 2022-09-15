const express = require('express')
const app = express()
const PORT = 3000

// EJS view engine
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// koneksi dengan database
const { Medicine, MedicineLog } = require('./utils/db')



// halaman index
app.get('/', async (req, res) => {
    medicines = await Medicine.find() 
    res.render('index', {
        medicines
    })
})

app.get('/tambah-obat', async (req, res) => {
    res.render('tambah-obat')
})

app.post('/tambah-obat', async (req, res) => {
    req.body.log = []
    console.log(req.body)
    await Medicine.insertMany(req.body)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})