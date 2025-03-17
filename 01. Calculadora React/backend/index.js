const { evaluate } = require("mathjs");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));

app.get("/", (req, res) => {
  res.send("Oi eu sou o BACKEND da REACT calc!");
});

app.post("/", (req, res) => {
  const { input } = req.body;
  console.log("Body backend:", input);

  const msg = {
    resultado: '',
    erro: false,
  };

  try {
    const result = evaluate(input).toString()
    msg.resultado = result;
  } catch(error) {
    msg.resultado = 'Conta Inválida',
    msg.erro = true;
  }
  console.log(msg);
  res.send(msg);
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
