import React from "react";
import { formatarMoeda } from './util/formatadorMoeda';

const LineDetail = (props) => {

  //const LineDetail = ({id, modelo, marca, ano, preco, handleClick})  
  return (
    <tr key={props.id} data-id={props.id} onClick={props.handleClick}>
      <td>{props.carta}</td>
      <td>{props.jogo}</td>
      <td>{props.ano}</td>
      <td>{formatarMoeda(props.preco)}</td>
      <td>
        <i className="far fa-edit text-success mr-2" title="Alterar"></i>
        <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
      </td>
    </tr>
  );
};

export default LineDetail;
