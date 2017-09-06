let fs = require('fs')
let path = require('path')
let petsPath = path.join(__dirname, 'pets.json')

let http = require('http')
let port = process.env.PORT || 8000

let server = http.createServer(function(req, res) {
  if(req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON){
      if (err) {
        console.error(err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        return res.end('Internal Server Error')
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(petsJSON)
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if(err){
        console.error(err)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        return res.end('Internal Server Error')
      }

      let pets = JSON.parse(petsJSON)
      let petJSON = JSON.stringify(pets[0])

      res.setHeader('Content-Type', 'application/json')
      res.end(petJSON)
    })
  }
else if (req.method === 'GET' && req.url === '/pets/1') {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if(err){
      console.error(err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Internal Server Error')
    }

    let pets = JSON.parse(petsJSON)
    let petJSON = JSON.stringify(pets[1])

    res.setHeader('Content-Type', 'application/json')
    res.end(petJSON)
  })
}
else {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not Found')
}
})

server.listen(port, function() {
  console.log('Listening...');
})

module.exports = server
