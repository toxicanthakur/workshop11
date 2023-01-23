const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());


app.put('/upload', upload.single('files'), (req, res) => {
  // Do something with the uploaded file
  res.send('File uploaded!');
});


app.delete('/delete-file/:fileName', (req, res) => {
  // Delete the file with the specified ID
  const filePath = `./files/${req.params.fileName}`;
  fs.unlinkSync(filePath);
  res.send('File successfully deleted');
});

app.post('/rename-file', (req, res) => {
  // Rename the file with the specified ID
  const { oldName, newName } = req.body;
  const oldPath = `./files/${oldName}`;
  const newPath = `./files/${newName}`;
  fs.renameSync(oldPath, newPath);
  res.send('File successfully renamed');
});



app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});