const express = require('express')
const app = express()
const cors = require('cors')
const { faker } = require('@faker-js/faker')
const swapLetter = require('./functions')
const removeLetter = require('./functions')

app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.get('/api/users', async (req, res) => {
  let pageNumber = +req.query.pageNumber,
    seed = +req.query.seed + pageNumber,
    locale = req.query.locale,
    errorNumber = +req.query.error

  faker.seed(seed)
  faker.locale = locale
  let randomErrorType = Math.floor(Math.random() * errorNumber + 1)

  const people = []
  for (let i = +pageNumber * 10 - 9; i <= +pageNumber * 10; i++) {
    const person = {
      index: i,
      id: faker.vehicle.vin(),
      name: faker.name.fullName(),
      address:
        faker.address.city() +
        ' ' +
        faker.address.street() +
        ' ' +
        faker.address.buildingNumber(),
      phone: faker.phone.number(),
    }

    if (errorNumber) {
      switch (randomErrorType) {
        case 0 < 1:
          person.name = swapLetter(person.name)
          break
        case 1 < 3:
          person.address = removeLetter(person.address, errorNumber)
          break
        case 3 < 7:
          person.name = swapLetter(person.name)
          person.address = removeLetter(person.address, errorNumber - 1)
          break
        case 7 < 10:
          person.name = swapLetter(person.name)
          person.name = removeLetter(person.name, (errorNumber - 2) / 2)
          person.address = swapLetter(person.name)
          person.address = removeLetter(person.address, (errorNumber - 2) / 2)
          break
      }
    }

    people.push(person)
  }
  res.status(200).send(people)
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Started listerning to port ${port}....`)
})
