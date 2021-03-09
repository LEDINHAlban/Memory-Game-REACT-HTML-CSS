//permet l'affichage d'une carte
import React, { useEffect, useState } from "react";

const CardDisplay = (props) => {
  const handleClick = () => {
    // On prévient le jeu que la carte a été retournée
    props.handleClick();
  };

  return (
    <button className="card" onClick={handleClick}>
      {/*render the value of the card if the card has flipped */}
      {props.actualState ? props["value"] : " "}
    </button>
  );
};

export default CardDisplay;
