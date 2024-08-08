import "./Card.css";

function Card({ pokemon, onClick }) {
  return (
    <>
      <div className="card" onClick={() => onClick(pokemon.id)}>
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h2 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
      </div>
    </>
  );
}

export default Card;
