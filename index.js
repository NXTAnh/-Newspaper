var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var indexRouter = require('./routers/index');
var timkiemRouter = require('./routers/timkiem');
var authRouter = require('./routers/auth');
var chudeRouter = require('./routers/chude');
var taikhoanRouter = require('./routers/taikhoan');
var baivietRouter = require('./routers/baiviet');

var uri = 'mongodb+srv://Malerie:anaoanh@malerie.ivvmzzs.mongodb.net/?retryWrites=true&w=majority&appName=Malerie';
mongoose.connect(uri).catch(err => console.log(err));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(session({
	name: 'iNews',                      // Tên session (tự chọn)
	secret: 'Black cat eat black mouse',// Khóa bảo vệ (tự chọn)
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 30 * 86400000           // 30 * (24 * 60 * 60 * 1000) - Hết hạn sau 30 ngày
	}
}));

app.use((req, res, next) => {
	res.locals.session = req.session;
	
	// Lấy thông báo (lỗi, thành công) của trang trước đó (nếu có)
	var error = req.session.error;
	var success = req.session.success;
	
	// Xóa thông báo (lỗi, thành công) cũ
	delete req.session.error;
	delete req.session.success;
	
	res.locals.errorMsg = '';
	res.locals.successMsg = '';
	
	// Gán thông báo (lỗi, thành công) mới
	if (error) res.locals.errorMsg = error;
	if (success) res.locals.successMsg = success;
	
	next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/chude', chudeRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/baiviet', baivietRouter);
app.use('/timkiem', timkiemRouter);


app.listen(3000, () => {
	console.log('Server is running...');
});