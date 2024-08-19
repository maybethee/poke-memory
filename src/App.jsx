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
        "https://pokeapi.co/api/v2/pokemon/280",
        "https://pokeapi.co/api/v2/pokemon/290",
        "https://pokeapi.co/api/v2/pokemon/286",
        "https://pokeapi.co/api/v2/pokemon/328",
        "https://pokeapi.co/api/v2/pokemon/255",
        "https://pokeapi.co/api/v2/pokemon/338",
        "https://pokeapi.co/api/v2/pokemon/333",
        "https://pokeapi.co/api/v2/pokemon/364",
        "https://pokeapi.co/api/v2/pokemon/360",
        "https://pokeapi.co/api/v2/pokemon/302",
        "https://pokeapi.co/api/v2/pokemon/326",
        "https://pokeapi.co/api/v2/pokemon/317",
      ];

      const promises = urls.map((url) => fetch(url).then((res) => res.json()));
      const results = await Promise.all(promises);
      setPokemon(results);
    };

    fetchPokemon();
  }, []);

  const [currentScore, setCurrentScore] = useState(12);
  const [bestScore, setBestScore] = useState(0);
  const [guessedIds, setGuessedIds] = useState([]);

  function handleScoreIncrease(id) {
    console.log(guessedIds);
    if (guessedIds.includes(id)) {
      let repeatedPokemon = pokemon.filter((mon) => mon.id === id)[0];
      alert(
        `You already clicked ${
          repeatedPokemon.name.charAt(0).toUpperCase() +
          repeatedPokemon.name.slice(1)
        }! Try again!`
      );
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
      <h1>Poké-Memory</h1>
      <p className="rules">
        Test your memory! Click different pokemon consecutively without
        repeating to increase your score. Can you get 12/12?
      </p>

      <div className="scores-container">
        <p key={`current-${currentScore}`} className="current-score animate">
          Current Score: {currentScore}/12
        </p>
        <p key={`best-${bestScore}`} className="best-score animate">
          Best Score: {bestScore}/12
        </p>
      </div>

      <div className="cards-div">
        {currentScore === 12 ? (
          <h2>Congratulations! You won!</h2>
        ) : (
          shuffledPokemon.map((mon) => {
            return (
              <Card key={mon.id} pokemon={mon} onClick={handleScoreIncrease} />
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
