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
