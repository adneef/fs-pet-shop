'use strict';

let fs = require('fs')
let path = require('path')
let petsPath = path.join('/Users/adneef/workspace/q2/fs-pet-shop', 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]
let index = process.argv[3]
let indexRange = [0, 1]
let indexCounter = 1

if (cmd === 'read' && index === undefined) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err
    }
    let pets = JSON.parse(data)

    console.log(pets);
  })
}
else if (cmd === 'read' && indexRange.includes(Number(index)) === true) {
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err){
      throw err
    }
    let pets = JSON.parse(data)

    console.log(pets[index]);
  })
}
else if(cmd === 'read' && indexRange.includes(Number(index)) === false){
  console.error(`Usage: ${node} ${file} read INDEX`)
  process.exitCode = 1
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr){
      throw readErr
    }

    let pets = JSON.parse(data)

    let newPet = {}
    let age = newPet.age = Number(process.argv[3])
    let kind = newPet.kind = process.argv[4]
    let name = newPet.name = process.argv[5]

    if(!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} create AGE KIND NAME`);

    }
  })
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exitCode = 1
}
