import React from 'react';
import './styles/InfoData.css'

const InfoData = (props) => {
    const cardListSize = Object.keys(props.data).length;

    const dataGames = {
        pokemon: 0,
        yugioh: 0,
        magic: 0,
        hearthStone: 0,
        spellweaver: 0
    }

    function countCards() {
        props.data.map(data => {
            switch (data.jogo) {
                case 'Pokemon':
                    dataGames.pokemon += 1;
                    break;
                case 'Yu-gi-oh':
                    dataGames.yugioh += 1;
                    break;
                case 'Magic':
                    dataGames.magic += 1;
                    break;
                case 'HearhStone':
                    dataGames.hearthStone += 1;
                    break;
                case 'Spellweaver':
                    dataGames.spellweaver += 1;
                    break;
                default:
                    console.log('Undefined game');
            }
            return 0;
        }
        )
    }

    if (cardListSize > 0)
        countCards();

    return (
        <>
            <div id="cardModal-Container">
                <div className="cardModal-panel">
                    <button onClick={props.onClose} className="btn btn-outline-danger"> X </button>
                    <div className="cardModal-content">
                        {cardListSize <= 0 && <h2>Não há dados a serem mostrados!</h2>}
                        {cardListSize > 0 &&
                            <>
                                <h2>Atualmente há {cardListSize} carta(s) registrada(s) </h2>
                                <h4>Pokémon:{dataGames.pokemon}</h4>
                                <h4>Yu-Gi-Oh:{dataGames.yugioh}</h4>
                                <h4>Magic:{dataGames.magic}</h4>
                                <h4>HearthStone:{dataGames.hearthStone}</h4>
                                <h4>Spellweaver:{dataGames.spellweaver}</h4>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoData;