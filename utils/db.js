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
    description: { type: String, default: "" },
    stock: { type: Number },
    log: { type: Array, default: [] }
})

// class MedicineLog {
//     MedicineLog(stock_io, description="", date=new Date().toLocaleString()) {
//         this.stock_io = stock_io
//         this.date = date
//         this.description = description
//     }
// }

const medicineLog = (stock_io, description="", date=new Date().toLocaleString()) => {
    return [stock_io, description, date]
}

module.exports = { Medicine, medicineLog }