var firebaseAdmin = require('firebase-admin')
var db = firebaseAdmin.firestore()
const Joi = require('@hapi/joi')

const bookSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
});

exports.create = (req, res) => {

  let bookData = bookSchema.validate(req.body)

  if (bookData.error) return res.json({
    error: bookData.error.message
  })

  db.collection('book').add(bookData.value).then(docRef => {

    res.json({
      id: docRef.id,
      object: bookData.value
    })

  }).catch(err => {

    res.json({
      error: err.message
    })

  })

}

exports.find = (req, res) => {

  db.collection('book').doc(req.params.key).get().then(book => {
    res.json(book.data())
  }).catch(err => {
    res.json({
      error: err.message
    })
  })

}

exports.update = (req, res) => {

  let key = req.params.key

  let bookData = bookSchema.validate(req.body)

  if (bookData.error) return res.json({
    error: bookData.error.message
  })

  docRef = db.collection('book').doc(key)

  docRef.update(bookData.value).then(() => {
    res.json({
      id: key,
      object: bookData.value
    })
  }).catch(err => {
    return res.json({
      error: err.message
    })
  })

}

exports.delete = (req, res) => {

  db.collection('book').doc(req.params.key).delete().then(() => {
    res.json({
      removed: true
    })
  }).catch(err => {
    res.json({
      error: err.message
    })
  })

}
