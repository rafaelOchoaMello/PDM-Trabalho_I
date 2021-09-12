import React, { useState, useEffect, useRef } from 'react'
import FormCard from './FormCard';
import LineDetail from './LineDetail';
import CardPoster from './CardPoster';
import "./table.css";

const AppBody = () => {
  
  const [lista, setLista] = useState([]);
  const childRef = useRef();

  // "efeito colateral", ocorre quando a página é carregada
  useEffect(() => {
    setLista(localStorage.getItem("cartas")
      ? JSON.parse(localStorage.getItem("cartas"))
      : []);
  }, []); 

  const handleClick = e => {
    // obtém a linha da tabela sobre a qual o usuário clicou, ou seja, qual elemento tr foi clicado
    const tr = e.target.closest("tr");

    // console.log(e.target);
    // console.log(tr);
    // console.log(tr.getAttribute("data-id"));  
    
    const id = Number(tr.getAttribute("data-id"));
    
    if (e.target.classList.contains("fa-edit")) {      
      // console.log("Alterar");

      // atribui a cada variável do form, o conteúdo da linha clicada
      const cartaAlt = {}
      cartaAlt.jogo = tr.cells[0].innerText;
      cartaAlt.marca = tr.cells[1].innerText;
      cartaAlt.ano = tr.cells[2].innerText;
      cartaAlt.preco = tr.cells[3].innerText;
      cartaAlt.id = id;

      // executa o método onLoadData do componente filho
      childRef.current.onLoadData(cartaAlt);

    } else if (e.target.classList.contains("fa-minus-circle")) {
      // console.log("Excluir");

      // obtém o jogo da linha sobre a qual o usuário clicou
      const jogo = tr.cells[0].innerText;

      if (window.confirm(`Confirma a exclusão do veículo "${jogo}"?`)) {
        // aplica um filtro para recuperar todas as linhas, exceto aquela que será excluída
        const novaLista = lista.filter((carta) => {return carta.id !== id});

        // atualiza o localStorage
        localStorage.setItem("cartas", JSON.stringify(novaLista));

        // atualiza a tabela (refresh)
        setLista(novaLista);
      }
    }
  }

  const atualizaLista = (dados) => {
    setLista(dados);
  }

  return (
    <div className="row">
      <CardPoster />

      <div className="col-sm-9 mt-2">
        <FormCard atualiza={atualizaLista} lista={lista} ref={childRef}/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome da carta</th>
              <th>Jogo</th>
              <th>Ano</th>
              <th>Preço R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((carta) => {
              carta.handleClick = handleClick;
              return (LineDetail(carta));
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppBody;