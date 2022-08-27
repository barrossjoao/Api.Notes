require('dotenv').config();
const express = require('express');
const app = express();
const User = require('./src/models/user');
const Note = require('./src/models/Note');
const { cpf } = require('cpf-cnpj-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middleware/auth');

app.use(express.json());

const cors = require('cors'); //Biblioteca pois estava dando erro no axios, o navegador reclamava


app.use(cors())

app.get('/', eAdmin, async (req, res) => {
  res.send("Redirecionamento Incorreto. Verifique!");
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({
    attributes: ['email', 'password'],
    where: {
      email: req.body.email
    }
  });

  if (user === null) {
    return res.status(401).send({
      error: 'Usuario não encontrado. Verifique os valores.'
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send({
      error: 'Senha incorreta. Verifique os valores.'
    });
  }

  var token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });

  res.status(200).send({
    erro: false,
    mensagem: 'Login realizado com sucesso!',
    token
  });

});


app.post('/new-cadastro', eAdmin, async (req, res) => {
  if (cpf.isValid(req.body.cpf)) {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 10);
    await User.create(dados)
      .then(() => {
        return res.status(201).json({
          message: "Usuário cadastrado com sucesso!"
        });
      }).catch(() => {
        return res.status(400).json({
          error: true,
          mensagem: "Erro: Cadastro não realizado"
        });
      });
  } else {
    return res.status(400).json({
      error: true,
      mensagem: "Erro: CPF Inválido"
    });
  }
});

app.get('/cadastros', eAdmin, async (req, res) => {
  await User.findAll()
    .then((user) => {
      return res.json({
        user
      });
    }).catch(() => {
      return res.status(400).json({
        error: true,
        mensagem: "Erro: Cadastro não realizado"
      });
    });
})

app.get('/buscar-cadastro-id', eAdmin, async (req, res) => {
  const { id } = req.body;
  await User.findByPk(id)
    .then((user) => {
      return res.json({
        user
      });
    }).catch(() => {
      return res.status(400).json({
        error: true,
        mensagem: "Erro: Cadastro não realizado"
      });
    });
});

app.put('/editar-cadastro', eAdmin, async (req, res) => {
  const { id } = req.body;
  await User.update(req.body, { where: { id } })
    .then(() => {
      return res.status(200).json(req.body);
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuario não editado com sucesso"
      });
    });
})

app.delete('/delete-user', eAdmin, async (req, res) => {
  const { id } = req.body;
  await User.destroy({ where: { id } })
    .then(() => {
      return res.status(200).json({
        mensagem: "Usuario deletado com sucesso"
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Usuario não foi deletado com sucesso"
      });
    });
});

app.post('/notes', eAdmin, async (req, res) => {

  await Note.create(req.body)
    .then(() => {
      return res.status(201).json(req.body);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nota não cadastradada com sucesso"
      });
    });
});

app.get("/buscarNote", eAdmin, async (req, res) => {
  const { id } = req.body;
  await Note.findByPk(id)
    .then((nota) => {
      return res.json({
        nota
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum produto encontrado!"
      });
    });
});

app.get("/listar-notas", eAdmin, async (req, res) => {
  await Note.findAll()
    .then((notas) => {
      return res.json({
        notas
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Nenhum produto encontrado!"
      });
    });
});


app.get("/listar-notas-", async (req, res) => {
  const { userId } = req.body;
  await Note.findAll({
    where: {
      userId: userId
    },
    order: [
      ['id', 'DESC']
    ]
  }).then((notas) => {
      return res.json({
        notas
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({
        erro: true,
        mensagem: `Erro: Nenhuma nota com o UserId: ${userId} encontrado!`
      });
    });
});

app.put('/edit-note', eAdmin, async (req, res) => {
  const { id } = req.body;
  await Note.update(req.body, { where: { id } })
    .then(() => {
      return res.json({
        mensagem: "Produto editado com sucesso!"
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Produto não editado com sucesso!"
      });
    });
});

app.delete('/delete-note', eAdmin, async (req, res) => {
  const { id } = req.body;
  await Note.destroy({ where: { id } })
    .then(() => {
      return res.json({
        mensagem: "Produto apagado com sucesso!"
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: Produto não apagado com sucesso!"
      });
    });
});

app.listen(process.env.DATABASE_PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.DATABASE_PORT}`);
});