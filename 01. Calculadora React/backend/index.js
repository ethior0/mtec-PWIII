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

  try {
    const result = evaluate(input).toString()
    console.log("Resposta back:", result);
    res.json(result);
  } catch(error) {
    console.log("Erro back");
    res.status(500).json({
      message: "Erro",
      error: error.message,
    });
  }
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));