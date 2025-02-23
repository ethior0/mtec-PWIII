import './App.css';
import { evaluate } from "mathjs";
import React, { useState } from "react";
import Button from './components/Button/Button';

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
    setResult("");
  }

  const handleClear = () => {
    setInput("");
    setResult("");
  }

  const handleRemoveNum = () => {
    setInput(input.slice(0, -1));
    setResult("");
  }

  // [5, 1, 2, 3, 4]
  // [5, 1, 2, 3]

  const updateHistory = (res) => {
    let nextHistory = [[input, res], ...history];

    if (nextHistory.length > 8) {
      nextHistory = nextHistory.slice(0, 8);
    }

    setHistory(nextHistory);
    console.log("Histórico:", nextHistory);
  }

  const handleEqual = () => {
    try {
      const res = evaluate(input).toString()
      setResult(res);
      updateHistory(res);
    } catch(error) {
      setResult("Erro");
    }
  }

  const historyData = history.map(([inp, res], i) => {
    return (
      <div key={i} className='history-data'>
        <p className='history-input'>{inp}</p>
        <span className='history-result'>{res}</span>
      </div>
    );
  });

  return (
    <div className="calculator">
      <div className='calc'>
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <Button children={"C"} onClick={handleClear} className="clear" />
          <Button children={"<"} onClick={handleRemoveNum} className="clear" />
          <Button children={"%"} onClick={() => handleClick("%")} className="operator" />
          <Button children={"/"} onClick={() => handleClick("/")} className="operator" />

          <Button children={"7"} onClick={() => handleClick("7")} />
          <Button children={"8"} onClick={() => handleClick("8")} />
          <Button children={"9"} onClick={() => handleClick("9")} />
          <Button children={"*"} onClick={() => handleClick("*")} className="operator" />

          <Button children={"4"} onClick={() => handleClick("4")} />
          <Button children={"5"} onClick={() => handleClick("5")} />
          <Button children={"6"} onClick={() => handleClick("6")} />
          <Button children={"-"} onClick={() => handleClick("-")} className="operator" />

          <Button children={"1"} onClick={() => handleClick("1")} />
          <Button children={"2"} onClick={() => handleClick("2")} />
          <Button children={"3"} onClick={() => handleClick("3")} />
          <Button children={"+"} onClick={() => handleClick("+")} className="operator" />

          <Button children={"0"} onClick={() => handleClick("0")} className="grid-span" />
          <Button children={"."} onClick={() => handleClick(".")} />
          <Button children={"="} onClick={handleEqual} className="equal" />
        </div>
      </div>
      <div className='history'>
        {historyData}
      </div>
    </div>
  );
}

export default App;
