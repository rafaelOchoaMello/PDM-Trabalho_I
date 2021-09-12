import React from "react";

const DivMessageErrors = ({ errors, ano_atual }) => {
  return (
    <div
      className={
        (errors.carta || errors.jogo || errors.ano || errors.preco) &&
        "alert alert-danger"
      }
    >
      {errors.carta && (
        <span>Carta deve ser preenchido (até 40 caracteres); </span>
      )}
      {errors.jogo && <span>Jogo deve ser selecionada; </span>}
      {errors.ano && (
        <span>
          Ano deve ser preenchido (entre {ano_atual - 50} e {ano_atual}
          );
        </span>
      )}
      {errors.preco && (
        <span>Preço deve ser preenchido (entre 1 e 100000); </span>
      )}
    </div>
  );
};

export default DivMessageErrors;
