var express = require('express');
var router = express.Router();
var firstImage = require('../modules/firstimage');
var ChuDe = require('../models/chude');
var BaiViet = require('../models/baiviet');

// GET: Trang chủ
router.get('/', async (req, res) => {
	var tukhoa = req.query?.tukhoa;
	var cd = await ChuDe.find();
	const filters = {KiemDuyet: 1, TieuDe: {$regex: tukhoa, $options: 'i'}};
	var bv = await BaiViet.find(filters)
		.populate('ChuDe')
		.populate('TaiKhoan')
		.sort ({ NgayDang: 'desc'})
		.exec();
	res.render('timkiem',{
		title: `Tìm kiếm theo ${tukhoa}`,
		chude: cd,
		baiviet: bv,
		firstImage: firstImage
	});
});

// GET: Xem bài viết
router.get('/baiviet/chitiet/:id', async function(req, res){
	var id = req.params.id;
	var bv = await BaiViet.findById(id)
		.populate('ChuDe')
		.populate('TaiKhoan').exec();
	res.render('baiviet_chitiet',{
		baiviet: bv
	});
});


// GET: Lỗi
router.get('/error', async (req, res) => {
	res.render('error', {
		title: 'Lỗi'
	});
});

// GET: Thành công
router.get('/success', async (req, res) => {
	res.render('success', {
		title: 'Hoàn thành'
	});
});

module.exports = router;