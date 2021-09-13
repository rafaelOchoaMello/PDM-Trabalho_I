import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import {NotificationContainer} from 'react-notifications';
import DivMessageErrors from "./DivMessageErrors";
import NotificationsAlert from "./NotificationsAlert";

const FormCard = forwardRef(({atualiza, lista}, ref) => {
  const {register, handleSubmit, formState: { errors }, setValue} = useForm();
  const [alterar, setAlterar] = useState(false);
  const [data_id, setData_id] = useState(0);

  // salva os dados na inclusão
  const onSubmit = (data) => {
    NotificationsAlert("success", "Sucesso!", "Nova carta registrada com exito!");
    // acrescenta um novo atributo aos dados enviados a partir do formulário
    data.id = new Date().getTime();
    console.log(data);

    // se houver dados salvos em localStorage, obtém esses dados (senão, vazio)
    const cartas = localStorage.getItem("cartas")
      ? JSON.parse(localStorage.getItem("cartas"))
      : "";

    // salva em localstorage os dados existentes, acrescentando o preenchido no form                    
    localStorage.setItem("cartas", JSON.stringify([...cartas, data]));

    // atualiza a lista
    // setLista([...lista, data]);
    atualiza([...lista, data]);

    // pode-se limpar cada campo
    setValue("carta", "");
    setValue("jogo", "");
    setValue("ano", "");
    setValue("preco", "");

    // ou, então, limpar todo o form
    // contudo, esse reset() não limpa o conteúdo das variáveis (ou seja, se o usuário
    // clicar 2x sobre o adicionar, irá duplicar o registro)
//    e.target.reset();
  }

  // salva os dados na alteração
  const onUpdate = data => {
    // inicialmente, recupera os dados salvos em localStorage
    const cartas = JSON.parse(localStorage.getItem("cartas"));

    // cria um novo array vazio
    const cartas2 = [];

    for (const carta of cartas) {
      if (carta.id === data_id) {
        data.id = data_id;
        cartas2.push(data);   // os dados do form (alterados) + data.id
      } else {
        cartas2.push(carta);
      }
    }

    // atualiza os dados em localStorage (com os dados de cartas2)
    localStorage.setItem("cartas", JSON.stringify(cartas2));

    // atualiza a lista (para fazer um refresh na página)
    // setLista(cartas2);
    atualiza(cartas2);

    setValue("carta", "");
    setValue("jogo", "");
    setValue("ano", "");
    setValue("preco", "");

    setAlterar(false);

    NotificationsAlert("info", "Atenção!", "Carta atualizada com sucesso");
  }

  // faz a desestruturação do objeto recebido
  const onLoadData = ({id, carta, jogo, ano, preco}) => {
    setValue("carta", carta);
    setValue("jogo", jogo);
    setValue("ano", ano);
    setValue("preco", preco);

    setAlterar(true);
    setData_id(id);
  }

  useImperativeHandle(ref, () => ({
    onLoadData
  }));

  // obtém o ano atual
  const ano_atual = parseInt(new Date().getFullYear());
  console.log(ano_atual)

  return (
    <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Carta:</span>
        </div>
        <input
          type="text"
          className="form-control"
          {...register("carta", {
            required: true,
            minLength: 2,
            maxLength: 40,
          })}
          autoFocus
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Jogo:</span>
        </div>
        <select
          className="form-control"
          {...register("jogo", {
            required: true,
          })}
        >
          <option value="">-- Selecione o Jogo--</option>
          <option value="Pokemon">Pokémon</option>
          <option value="Yu-gi-oh">Yu-Gi-Oh</option>
          <option value="Magic">Magic</option>
          <option value="HearhStone">HearthStone</option>
          <option value="Spellweaver">Spellweaver</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Ano:</span>
        </div>
        <input
          type="number"
          className="form-control"
          {...register("ano", {
            required: true,
            min: ano_atual - 50,
            max: ano_atual,
          })}
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Preço R$:</span>
        </div>
        <input
          type="number"
          className="form-control"
          {...register("preco", {
            required: true,
            min: 1,
            max: 100000,
          })}
        />
        <div className="input-group-append">
          <input
            type="submit"
            className={alterar ? "d-none" : "btn btn-primary"}
            value="Adicionar"    
          />
          <input
            type="submit"
            className={alterar ? "btn btn-success" : "d-none"}
            value="Alterar"
          />
        </div>
      </div>
      <DivMessageErrors errors={errors} ano_atual={ano_atual} />    
      <NotificationContainer/>
    </form>
  );
});

export default FormCard;
