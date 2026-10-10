const multer = require('multer');
const { resolve } = require('node:path');


module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_request, file, callback) => {
      
      return callback(null, file.originalname);
    },
  }),
};
