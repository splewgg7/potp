import React from "react";

const Card = ({ info, timeline, selectedPresRef, idx, setSelected }) => {
  return (
    <div
      className="card-press"
      onClick={() => {
        setSelected(info);
        timeline.play();
        setTimeout(() => {
          selectedPresRef.current.scrollIntoView({
            behavior: "smooth",
          });
        }, 250);
      }}
    >
      <img src={info.image} alt="president" />
      <h1>{info.name}</h1>
    </div>
  );
};

export default Card;
