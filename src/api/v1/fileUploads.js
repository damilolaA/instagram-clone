const multer = require('multer'),
			mime   = require('mime');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},

	filename: (req, file, cb) => {
		cb(null, Date.now() + "." + mime.getExtension(file.mimetype))
	}
});

let filetype = (req, file, cb) => {
	if(file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
		return cb("invalid image extension", false);
	}

	cb(null, true);
}

let upload = multer({storage: storage, filetype: filetype}).single("image");

module.exports = upload;
