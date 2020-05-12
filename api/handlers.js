const fs = require('fs');
const path = require('path');
const config = require('../config');

const FILES_DIR = path.join(__dirname, '/..', config.FILES_DIR);

const handlers = {
  getFiles: (req, res, next) => {
    fs.readdir(FILES_DIR, (err, list) => {
      if (err && err.code === 'ENOENT') {
        console.log(err);
        res.status(404).end();
        return;
      }
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      res.json(list);
    });
  },
  getFile: (req, res, next) => {
    const fileName = req.params.name;
    fs.readFile(`${FILES_DIR}/${fileName}`, 'utf-8', (err, fileText) => {
      if (err && err.code === 'ENOENT') {
        console.log(err);
        res.status(404).end();
        return;
      }
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      const responseData = {
        name: fileName,
        text: fileText,
      };
      res.json(responseData);
    });
  },
  postFile: (req, res, next) => {
    const fileName = req.params.name; // read from params
    const fileText = req.body.text; // read from body
    fs.writeFile(`${FILES_DIR}/${fileName}`, fileText, err => {
      if (err && err.code === 'ENOENT') {
        console.log(err);
        res.status(404).end();
        return;
      }
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      handlers.getFiles(req, res, next);
    });
  },
  deleteFile: (req, res, next) => {
    const fileName = req.params.name; // read from params
    fs.unlink(`${FILES_DIR}/${fileName}`, err => {
      if (err && err.code === 'ENOENT') {
        console.log(err);
        res.status(404).end();
        return;
      }
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      handlers.getFiles(req, res, next);
    });
  }
};

module.exports = handlers;
