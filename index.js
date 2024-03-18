var express = require('express');
var cors = require('cors');
const multer = require('multer'); // Middleware for handling multipart/form-data
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Access uploaded file details from req.file
  const { originalname, mimetype, size } = req.file;
  
  // Send JSON response containing file details
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
