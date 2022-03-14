const express = require('express');
const app = express();
const User = require('./models/user');
const Note = require('./models/Note')

app.use(express.json());

app.get('/', async (req, res)=> {
    res.send("pagina inicial");
});

app.post('/cadastrar', async (req, res)=> {
    console.log(req.body)

    await User.create(req.body)
    .then(() => {
        return res.status(200).json(req.body);
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Usuario não cadastradado com sucesso"
        });
    });
})

app.post('/notes', async (req, res)=> {
    console.log(req.body)

    await Note.create(req.body)
    .then(() => {
        return res.status(200).json(req.body);
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Usuario não cadastradado com sucesso"
        });
    });
})

app.get("/buscarNote", async (req, res) => {
    const { id } = req.body;
    await Note.findByPk(id)
    .then((nota) => {
        return res.json({
            erro: false,
            nota
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
          erro: false,
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
          erro: false,
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
})