import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
  try {
    const usuario = await prisma.usuario.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    let usuarios = [];

    if (Object.keys(req.query).length > 0) {
      usuarios = await prisma.usuario.findMany({
        where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age,
        },
      });
    } else {
      usuarios = await prisma.usuario.findMany();
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.usuario.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// Use variáveis de ambiente para definir a porta e o host
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
