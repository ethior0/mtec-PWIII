const express = require("express");
const cors = require("cors");

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.get("/", (req, res) => {
  res.send("Página do BACKEND");
})

app.post("/", (req, res) => {
  const { data } = req.body;

  const msg = {
    resultado: '',
    erro: false,
  }

  try {
    const resposta = eval(data);
    msg.resultado = resposta;

    if (!data) {
      msg.resultado = 'Conta Inválida';
      msg.erro = true;
    }
  } catch (e) {
    msg.resultado = 'Conta Inválida';
    msg.erro = true;
  }
  res.send(msg);
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});