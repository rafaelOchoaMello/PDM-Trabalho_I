import React from 'react'
import cardHeaderImage from './images/cardHeaderImage.png'
import './styles/AppHeaderBar.css'

const AppHeaderBar = () => {
  return (
    <div className="row">
      <div className="col-sm-12 py-2 mb-5" id="appHeaderBar">
        <div>
          <h1 className="text-white">
            TCG Hunter - Boosters, Decks e cartas avulsas
          </h1>
          <h5 className="text-white font-italic">
            Monte seu baralho, complete sua coleção!
          </h5>
        </div>
        <img src={cardHeaderImage} alt="Logo"></img>
      </div>
    </div>
  );
}

export default AppHeaderBar;