const express = require('express');
const app = express();
const User = require('./src/models/user');
const Note = require('./src/models/Note');
const { cpf } = require('cpf-cnpj-validator');

app.use(express.json());

const cors = require('cors'); //Biblioteca pois estava dando erro no axios, o navegador reclamava


app.use(cors())

app.get('/', async (req, res)=> {
    res.send("Redirecionamento Incorreto. Verifique!");
});

app.post('/new-cadastro', async (req, res)=> {
    if (cpf.isValid(req.body.cpf)) {
      await User.create(req.body)
      .then(()=>{
          return res.status(200).json(req.body);
      }).catch(()=>{
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

app.get('/cadastros', async (req, res)=> {
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

app.get('/buscar-cadastro-id', async (req, res)=> {
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
  
app.put('/editar-cadastro', async (req, res)=> {
    const {id} = req.body;
    await User.update(req.body, {where: {id}})
    .then(() => {
        return res.status(200).json(req.body);
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Usuario não editado com sucesso"
        });
    });
})

app.post('/notes', async (req, res)=> {

    await Note.create(req.body)
    .then(() => {
        return res.status(200).json(req.body);
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Usuario não cadastradado com sucesso"
        });
    });
});

app.get("/buscarNote", async (req, res) => {
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

  app.get("/listar-notas", async (req, res) => {
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

  app.put('/edit-note', async (req, res) => {
    const {id} = req.body;
    await Note.update(req.body, {where: {id}})
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

  app.delete('/delete-note', async (req, res) => {
    const {id} = req.body;
    await Note.destroy({where: {id}})
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

app.listen(8080, () => {
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080")
});