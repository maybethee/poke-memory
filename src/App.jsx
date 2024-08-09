import { useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);

  let unshuffledPokemon = pokemon;

  let shuffledPokemon = unshuffledPokemon
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

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

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [guessedIds, setGuessedIds] = useState([]);

  function handleScoreIncrease(id) {
    console.log(guessedIds);
    if (guessedIds.includes(id)) {
      console.log("you guessed that already");
      setCurrentScore(0);
      setGuessedIds([]);
    } else {
      setCurrentScore(currentScore + 1);
      if (currentScore >= bestScore) {
        setBestScore(currentScore + 1);
      }
      setGuessedIds([...guessedIds, id]);
    }
  }

  return (
    <>
      <h1>Poké Memory</h1>

      <div className="scores-container">
        <p key={`current-${currentScore}`} className="current-score animate">
          Current Score: {currentScore}
        </p>
        <p key={`best-${bestScore}`} className="best-score animate">
          Best Score: {bestScore}
        </p>
      </div>
      {/* <p className="current-score">Current Score: {currentScore}</p>
      <p className="best-score">Best Score: {bestScore}</p> */}

      <div className="cards-div">
        {shuffledPokemon.map((mon) => {
          return (
            <Card key={mon.id} pokemon={mon} onClick={handleScoreIncrease} />
          );
        })}
      </div>
    </>
  );
}

export default App;
