var express = require('express');
var router = express.Router();
var firstImage = require('../modules/firstimage');
var ChuDe = require('../models/chude');
var BaiViet = require('../models/baiviet');
var BinhLuan = require('../models/binhluan');

// GET: Trang chủ
router.get('/', async (req, res) => {
	var cd_id = req?.query?.chude;
	const filters = {KiemDuyet: 1};
	var cd = await ChuDe.find();
	if (cd_id) {
		filters.ChuDe = cd_id;
	}
	var bv = await BaiViet.find(filters)
		.populate('ChuDe')
		.populate('TaiKhoan')
		.sort ({ NgayDang: 'desc'})
		.exec();
	res.render('home',{
		title: 'Trang chu ',
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
	var data = {
		LuotXem: Number(bv.LuotXem || 0) + 1, 
	};
	await BaiViet.findByIdAndUpdate(id, data);
	var cmts = await BinhLuan.find({baiViet: id}).exec();
	res.render('baiviet_chitiet',{
		baiviet: bv,
		comments: cmts,
	});
});

// GET: Tin mới nhất
router.get('/tinmoinhat', async function(req, res){
	const filters = {KiemDuyet: 1};
	var bv = await BaiViet.find(filters)
		.populate('ChuDe')
		.populate('TaiKhoan')
		.sort ({ NgayDang: 'desc'})
		.limit(1)
		.exec();
	res.render('tinmoinhat',{
		title: 'Hello',
		baiviet: bv?.[0],
		firstImage: firstImage
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