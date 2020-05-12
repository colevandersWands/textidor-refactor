const handlers = require('./handlers.js');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('files API!');
});

// - declare routes -
// helpful hint:
//  open /public/actions.js next to this file
//  can you figure out which action calls which route?
//  which http method does each action use?
//  what route does each one call?

// read all file names
//  called in init.js
//  redirected to by other routes
router.get('/files', handlers.getFiles);

// read a file
//  called by action: fetchAndLoadFile
router.get('/files/:name', handlers.getFile);

// write a file
//  called by action: saveFile
router.post('/files/:name', handlers.postFile);

// delete a file
//  called by action: deleteFile
router.delete('/files/:name', handlers.deleteFile);

module.exports = router;
