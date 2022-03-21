const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  function fileFilter (req, file, cb) {
    if(mimetype != 'image/jpeg' || mimetype != 'image/png')
        cb(null, false)
    else
        cb(null, true)
  }

const options = {
    storage : storage,
    fileFilter : fileFilter
}

const upload = multer(options);

module.exports = upload;