const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare('apples', '$2a$10$UUJdmLSq5bdvErNpD9l5M.6Idj3rQcq6DBSN8Uvqzp05XNOFyeF.O', function (err, res) {
  //   // res == true
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log('first guess', res)
  // })
  // bcrypt.compare('veggies', '$2a$10$UUJdmLSq5bdvErNpD9l5M.6Idj3rQcq6DBSN8Uvqzp05XNOFyeF.O', function (err, res) {
  //   // res = false
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log('second guess', res)
  // })
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logging in')
  }
  res.json('signin')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      console.log(err)
    }
    console.log(hash)
  })
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('Not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('Not found')
  }
})

app.listen(3001, () => {
  console.log('app is running on port 3001')
})