const express = require('express')
const app = express()
const PORT = 3000

// EJS view engine
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// koneksi dengan database
const { Medicine, medicineLog } = require('./utils/db')
const { ObjectId } = require('mongodb')
const Contact = require('../practice-npm/model/contact')


// halaman index
app.get('/', async (req, res) => {
    const medicines = await Medicine.find() 
    res.render('index', {
        medicines
    })
})

// tambah data obat ke database
app.get('/add', async (req, res) => {
    res.render('add')
})
app.post('/add', async (req, res) => {
    req.body.log = [medicineLog(
        req.body.stock, "Data obat ditambahkan ke database"
    )]
    await Medicine.insertMany(req.body)
    res.redirect('/')
})

// hapus data obat dari database
app.get('/delete/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        await Medicine.deleteOne({_id: ObjectId(req.params.id)})
        res.redirect('/')
    } else {
        res.status(404)
        res.send('<h1>Error 404: Not Found</h1>')
    }
})

// edit data obat dari database
app.get('/edit/:id', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.params.id)})
    if (medicine) {
        res.render('edit', { medicine })
    } else {
        res.status(404)
        res.send('<h1>Error 404: Not Found</h1>')
    }
})
app.post('/edit', async (req, res) => {
    const medicine = await Medicine.findOne({_id: ObjectId(req.body._id)})
    if (medicine) {
        await Medicine.updateOne(
            {_id: ObjectId(req.body._id)},
            {
                $set: {
                    name: req.body.name,
                    manufacturer: req.body.manufacturer,
                    description: req.body.description
                }
            }
        )
        res.redirect('/')
    }
})

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})