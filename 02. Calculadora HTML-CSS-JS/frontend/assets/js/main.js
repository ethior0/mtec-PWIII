function criaCalculadora() {
  return {
    display: document.querySelector(".display"),
    
    inicia() {
      this.cliqueBotoes();
      this.pressionaEnter();
    },

    pressionaEnter() {
      this.display.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
          this.realizaConta();
        }
      });
    },

    adicionaDisplay(valor) {
      this.display.value += valor;
      this.display.focus();
    },

    limpaDisplay() {
      this.display.value = '';
    },

    deletaNum() {
      this.display.value = this.display.value.slice(0, -1);
    },

    async realizaConta() {
      const conta = {
        data: this.display.value,
      }

      const res = await fetchCalculadora(conta);
      console.log("Resultado que veio do back", res);

      if (!res.erro) {
        this.trocaCorResultado('black', 600);
        this.display.value = res.resultado;
      } else {
        alert('Conta Inválida');
        this.limpaDisplay();
      }
    },

    cliqueBotoes() {
      document.addEventListener('click', (e) => {
        const el = e.target;

        if (el.classList.contains('btn-num')) {
          this.trocaCorResultado('grey', 400);
          this.adicionaDisplay(el.innerText);
        }
        
        if (el.classList.contains('btn-clear')) {
          this.limpaDisplay();
        }

        if (el.classList.contains('btn-del')) {
          this.deletaNum();
        }
        
        if (el.classList.contains('btn-eq')) {
          this.realizaConta();
        }
      });
    },

    trocaCorResultado(cor, peso) {
      this.display.style.color = cor;
      this.display.style.fontWeigth = peso;
    }

  };
}

import { fetchCalculadora } from "./script.js";

const calculadora = criaCalculadora();
calculadora.inicia();
