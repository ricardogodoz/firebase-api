var express = require('express')
var bookController = require('../controllers/bookController.js')
var router = express.Router()

router.post('/', bookController.create)
router.get('/:key', bookController.find)
router.put('/:key', bookController.update)
router.delete('/:key', bookController.delete)

module.exports = router;
