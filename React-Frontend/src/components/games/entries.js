import React, { useState, useEffect } from "react";
import defaultBoxart from '/home/grayc/grayc-project/src/components/games/boxarts/DefaultBoxart.png';
import { Link } from "react-router-dom";

function Entries() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({game_id: 'a', game_name: 'b'});
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(true);
  
  useEffect(() => {
    // Fetch game using the postSlug
    fetch(`http://52.86.154.61:3000/`)
      .then((response) => response.json())
      .then((getData) => setData(getData)  );
  }, []);
 
  return (
    <div className="home">
      <div class="container">
      <div>
        
        {!hidden ?
        <form action="http://52.86.154.61:3000/" method="POST">
            
            <div>
                <label for="game_name">Game Title:</label>
                <input type="text" name="game_name" id="game_name" required></input>
            </div>
            <div>
                <label for="platform">Platform:</label>
                <input type="text" name="platform" id="platform" required></input>
            </div>
            <div>
                <label for="developer">Developer:</label>
                <input type="text" name="developer" id="developer" required></input>
            </div>
            <div>
                <label for="publisher">Publisher:</label>
                <input type="text" name="publisher" id="publisher"required></input>
            </div>
            <div>
                <label for="release_date">Release Date:</label>
                <input type="date" name="release_date" id="release_date"  required></input>
            </div>
            <div>
                <label for="genre">Genre:</label>
                <input type="text" name="genre" id="genre" required></input>
            </div>
            <div>
                
                <input type="hidden" name="boxart" id="boxart" value="/home/grayc/grayc-project/src/components/games/boxarts/DefaultBoxart.png"></input>
            </div>
            <button type="submit">Submit</button>
        </form>
        
        
        : null}
        <button onClick={() => setHidden(s => !s)}>
        ADD NEW
        </button>
      </div>
      {data &&
            data.map((game) => {
                return (        
                <ul>   
                <li key={game.game_id}>
                  <Link to ={"/games/" + game.game_id}>
                  <img
                  id = "boxarts"
                  class="img-fluid rounded mb-4 mb-lg-0"
                  src={defaultBoxart}
                  alt={game.game_name + " Boxart"}
                  width = "150"
                  height = "230"
                  />
                  
                  <h1>{game.game_name}</h1>
                  </Link>
                  <h2>Platform: {game.platform}</h2>
                  <h3 id= "Dates">Release Date: {game.release_date}</h3>
                  <h3>Genre: {game.genre}</h3>
                  <h3>Rating: {game.rating} / 5</h3>
                  <br></br>
                </li>               
                </ul>
               
                );
            })}           
      </div>
    </div>
  );
}

export default Entries;