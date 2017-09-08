let fs = require('fs')
let path = require('path')
petsPath = path.join(__dirname, 'pets.json')

let express = require('express')
let app = express()
let port = process.env.PORT || 8000

let morgan = require('morgan')
let bodyParser = require('body-parser')

app.disable('x-powered-by')
app.use(morgan('short'))
app.use(bodyParser.json())

//handle a GET request with no index to return the entire file
app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if(readErr) {
      console.log(readErr.stack)
      return res.sendStatus(500)
    }

    let pets = JSON.parse(petsJSON)

    res.send(pets)
  })
})

//handle the GET request with an extent index to return just the pet at that index
app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if(readErr){
      console.error(readErr.stack)
      res.sendStatus(500)
    }

    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)

    if(id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }

    res.set('Content-Type', 'text/plain')
    res.send(pets[id])
  })
})

//handle a POST request to add a new entry to the petsJSON
app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON){
    if (readErr) {
      console.error(readErr.stack)
      res.sendStatus(500)
    }

    let pets = JSON.parse(petsJSON)

    let age = Number(req.body.age)
    let kind = req.body.kind
    let name = req.body.name

    if(!kind || !name || Number.isNaN(age)) {
      return res.sendStatus(400)
    }
    let newPet = {age, kind, name}
    let petJSON = JSON.stringify(newPet)

    pets.push(newPet)
    let addedPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, addedPetsJSON, function(writeErr) {
      if(writeErr){
        console.error(writeErr.stack)
        return res.sendStatus(500)
      }
      res.set('Content-Type', 'application/json')
      res.send(newPet)
    })
  })
})

//catch all for anything that makes it this far
app.use(function(req, res) {
  res.sendStatus(404)
})

app.listen(port, function(){
  console.log('Listening...');
})

module.exports = app
