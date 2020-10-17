const Clarifai = require('clarifai')
const dotenv = require('dotenv')

dotenv.config()
const keyAPI = process.env.REACT_APP_CLARIFAI_API

const app = new Clarifai.App({
  apiKey: keyAPI
})

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(_err => res.status(400).json('Unable to work with the API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(_err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage,
  handleAPICall
}
