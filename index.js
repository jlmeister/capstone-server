require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const port = process.env.PORT || 4000
const { client, Lookup } = require("./services/smartystreets/streetLookup.js");

const mysql = require('mysql')
const db = require('./sql/connection')

// app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.post('/api/user/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let sql = 'INSERT INTO ?? (??, ??) VALUES (?, ?)';
    const replacements = [
      'users',
      'email',
      'password',
      req.body.email,
      hashedPassword
    ];
    sql = mysql.format(sql, replacements);
    db.query(sql, (err) => {
      if (err) {
        console.log('error adding user:\n')
        throw err;
      }
      res.sendStatus(200)
    })
  }
  catch {
    res.sendStatus(400)
  }
})

app.post('/api/user/login', (req, res) => {
    let sql = 'SELECT * from ?? where ?? = ?'
    const replacements = [
      'users',
      'email',
      req.body.email
    ]
    sql = mysql.format(sql, replacements);
    db.query(sql, (err, results) => {
      if (err) {
        console.log('error getting user\n')
        throw err
      }
      console.log('this is the list of users asked for... ', results[0])
      bcrypt.compare(req.body.password, results[0].password, (err, verified) => {
        if(verified)
          res.status(200).json({ id: results[0].id, email: results[0].email })
        else
          res.sendStatus(404)
      })
    })
})

app.post('/api/addresses/verify', (req, res) => {
  const lookup = new Lookup();
  if (req.body.hasOwnProperty('secondary') && req.body.secondary.length > 0) {
    lookup.street = req.body.street
    lookup.secondary = req.body.secondary
    lookup.lastLine = req.body.lastLine
  }
  else
    lookup.street = `${req.body.street} ${req.body.lastLine}`
  client.send(lookup)
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

app.post('/api/addresses/add', (req, res) => {
  let sql = 'INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const replacements = [
    'addresses',
    'delivery_line',
    'last_line',
    'primary_number',
    'street_name',
    'street_suffix',
    'secondary_designator',
    'secondary_number',
    'city',
    'state',
    'zip',
    'plus4code',
    'user_id',
    req.body.deliveryLine1,
    req.body.lastLine,
    req.body.primaryNumber,
    req.body.streetName,
    req.body.streetSuffix,
    req.body.secondaryDesignator,
    req.body.secondaryNumber,
    req.body.cityName,
    req.body.state,
    req.body.zipCode,
    req.body.plus4Code,
    req.body.userID
  ]
  sql = mysql.format(sql, replacements)

  db.query(sql, (err, results) => {
    if (err) {
      console.log('error adding address:\n')
      throw err
    }
    console.log('these are the results ', results)
    return res.sendStatus(200)
  })
})

app.post('/api/addresses/update', (req, res) => {
  console.log('******* HI IM THE BODY *******\n', req.body)
  let sql = 'UPDATE ?? SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE ??=?'
  const replacements = [
    'addresses',
    'delivery_line',
    req.body.deliveryLine1,
    'last_line',
    req.body.lastLine,
    'primary_number',
    req.body.primaryNumber,
    'street_name',
    req.body.streetName,
    'street_suffix',
    req.body.streetSuffix,
    'secondary_designator',
    req.body.secondaryDesignator,
    'secondary_number',
    req.body.secondaryNumber,
    'city',
    req.body.cityName,
    'state',
    req.body.state,
    'zip',
    req.body.zipCode,
    'plus4code',
    req.body.plus4Code,
    'id',
    req.body.addressID
  ]
  sql = mysql.format(sql, replacements)

  db.query(sql, (err, results) => {
    if (err) {
      console.log('error updating address:\n')
      throw err
    }
    console.log('these are the results after updating... ', results)
    return res.sendStatus(200)
  })
})

app.get('/api/addresses/:id', (req, res) => {
  console.log('parameters ', req.params)
  let sql = 'SELECT * FROM ?? WHERE ??=?'
  const replacements = [
    'addresses',
    'user_id',
    req.params.id
  ]
  sql = mysql.format(sql, replacements)

  db.query(sql, (err, results) => {
    if (err) {
      console.log('error getting addresses: ')
      throw err
    }
    console.log('these are all the addresses for the user ... ', results)
    res.json(results)
  })
})

app.delete('/api/addresses', (req, res) => {
  let sql = 'DELETE FROM ?? WHERE ??=? AND ??=?'
  const replacements = [
    'addresses',
    'id',
    req.body.addressID,
    'user_id',
    req.body.userID
  ]
  sql = mysql.format(sql, replacements)

  db.query(sql, (err) => {
    if (err) {
      console.log('there was an error deleting the address ... ', err)
      throw err
    }
    res.sendStatus(200)
  })
})

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
})

app.listen(port, () => console.log(`listening on port ${port}`))