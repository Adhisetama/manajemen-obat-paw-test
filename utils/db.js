const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:admin@testmongo.rbvgcyd.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// model struktur database
const Medicine = mongoose.model('Medicine', {
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    stock: { type: Number },
    log: { type: Array }
})

class MedicineLog {
    MedicineLog(stock_io, date=new Date().toLocaleString(), description="") {
        this.stock_io = stock_io
        this.date = date
        this.description = description
    }
}

module.exports = { Medicine, MedicineLog }