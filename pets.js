'use strict';

let fs = require('fs')
let path = require('path')
let petsPath = path.join('/Users/adneef/workspace/q2/fs-pet-shop', 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]

if (cmd === 'read') {
  let index = process.argv[3]

  if (!index) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err
      }
      let pets = JSON.parse(data)

      console.log(pets);
    })
  } else {
    let indexIncluded = false

    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err
      }
      let pets = JSON.parse(data)
      for (var i in pets) {
        if (Number(index) === Number(i)) {
          console.log(pets[i]);
          indexIncluded = true
        }
      }
      if(indexIncluded === false) {
        console.error(`Usage: ${node} ${file} read INDEX`)
        process.exitCode = 1
      }
    })
  }
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr){
      throw readErr
    }

    let pets = JSON.parse(data)

    let newPet = {}
    let age = (newPet.age = Number(process.argv[3]))
    let kind = (newPet.kind = process.argv[4])
    let name = (newPet.name = process.argv[5])

    if(!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
      process.exit(1)
      }
      pets.push(newPet)

      let petsJSON = JSON.stringify(pets)

      fs.writeFile(petsPath, petsJSON, function(writeErr){
        if (writeErr) {
          throw writeErr
        }

        console.log(newPet);
      })
  })
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exitCode = 1
}
