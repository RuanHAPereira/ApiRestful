import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.post('/usuarios', async(req, res) => {

  await prisma.usuario.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })

  res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

  let usuarios = []

  if (req.query) {
    usuarios = await prisma.usuario.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    usuarios = await prisma.usuario.findMany()
  }
 
  res.status(200).json(usuarios)
})

app.put('/usuarios/:id', async(req, res) => {

  await prisma.usuario.update({
    where:{
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    },
  })

  res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.usuario.delete({
    where: {
      id: req.params.id
    },
  })

  res.status(200).json({ message: 'Usuário deletado com sucesso!!'})
})

app.listen(3000)


 //ruan
 //yrwVZ1jSnWbaAU1u