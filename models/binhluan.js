var mongoose = require('mongoose');

var binhLuanSchema = new mongoose.Schema({
    baiViet: { type: mongoose.Schema.Types.ObjectId, ref: 'BaiViet' },
    noiDung: { type: String, required: true },
    tacGia: { type: String, required: true },
    ngayTao: { type: Date, default: Date.now }
});

var binhLuanModel = mongoose.model('BinhLuan', binhLuanSchema);

module.exports = binhLuanModel;