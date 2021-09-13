import './styles/SearchModal.css'
import React from "react";
import { useForm } from "react-hook-form";
import { NotificationContainer } from 'react-notifications';
import DivMessageErrors from "./DivMessageErrors";
import { formatarMoeda } from './util/formatadorMoeda';


const SearchModal = (props) => {
    const cardListSize = Object.keys(props.data).length;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const container = document.getElementById('searchResultContainer');
        container.innerHTML = '';
        const innerTag = document.createElement('p');

        if (cardListSize <= 0) {
            const info = document.createTextNode('Não há produtos registrados');
            innerTag.appendChild(info);
            container.appendChild(innerTag);
        }
        else if (data !== '') {
            const result = props.data.filter((card) => card.carta === data.carta)
            console.log(result)

            if (result.length > 0) {
                const info = document.createTextNode(result.map((info, index) => {
                    return `Resultado) ${info.carta} - ${info.jogo} - ${info.ano} - ${formatarMoeda(info.preco)}`
                }))
                innerTag.appendChild(info);
                container.appendChild(innerTag);
            }
            else {
                const info = document.createTextNode('Nenhuma carta encontrada');
                innerTag.appendChild(info);
                container.appendChild(innerTag);
            }
        }
    }

    return (
        <>
            <div id="searchModal-Container">
                <div className="searchModal-panel">
                    <button onClick={props.onClose} className="btn btn-outline-danger"> X </button>
                    <div className="searchModal-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Carta:</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchInput"
                                    {...register("carta", {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 40,
                                    })}
                                />

                                <input
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                    value="Pesquisar"
                                />
                            </div>
                            <div className="mt-2" id="searchResultContainer" />

                            <DivMessageErrors errors={errors} />
                            <NotificationContainer />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchModal;