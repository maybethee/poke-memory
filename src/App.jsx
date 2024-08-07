import { useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const urls = [
        "https://pokeapi.co/api/v2/pokemon/210",
        "https://pokeapi.co/api/v2/pokemon/220",
        "https://pokeapi.co/api/v2/pokemon/230",
        "https://pokeapi.co/api/v2/pokemon/240",
        "https://pokeapi.co/api/v2/pokemon/250",
        "https://pokeapi.co/api/v2/pokemon/260",
        "https://pokeapi.co/api/v2/pokemon/270",
        "https://pokeapi.co/api/v2/pokemon/280",
        "https://pokeapi.co/api/v2/pokemon/290",
        "https://pokeapi.co/api/v2/pokemon/300",
        "https://pokeapi.co/api/v2/pokemon/310",
        "https://pokeapi.co/api/v2/pokemon/320",
      ];

      const promises = urls.map((url) => fetch(url).then((res) => res.json()));
      const results = await Promise.all(promises);
      setPokemon(results);
    };

    fetchPokemon();
  }, []);

  // const currentScore = null;
  // const bestScore = null;

  return (
    <>
      <h1>Poké Memory</h1>

      <div className="cards-div">
        {pokemon.map((mon) => {
          return <Card key={mon.id} pokemon={mon} />;
        })}
      </div>

      {/* needs: */}
      {/* - current score */}
      {/* - best score */}
      {/* - function to display cards (displayed in random order anytime a uyser clicks one) */}
      {/* - cards (imgs and text fetched with api) */}
    </>
  );
}

export default App;
