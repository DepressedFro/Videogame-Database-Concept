import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import defaultBoxart from '/home/grayc/grayc-project/src/components/games/boxarts/DefaultBoxart.png';

function Entry() {
  let { postSlug } = useParams();
  const [data, setData] = useState(null);
  const [hidden, setHidden] = useState(true);

  const [game_id, setGameID] = useState(postSlug);
  const [game_name, setGameName] = useState('');
  const [platform, setPlatform] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [release_date, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const[boxart, setBoxart] = useState(defaultBoxart)


  useEffect(() => {
    // Fetch game using the postSlug
    fetch(`http://52.86.154.61:3000/${postSlug}`)
      .then((response) => response.json())
      .then((getData) => setData(getData)  );
  }, []);



 //Delete the specified ID and then push the user back to the main directory
  function handleDelete()
  {
    fetch(`http://52.86.154.61:3000/${postSlug}`, {

      method: 'DELETE', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      
    });
    window.location.replace('http://52.86.154.61:23219/games')
  }

  //Update the selected game and then refresh the page
  function handleSubmit(event) {
    event.preventDefault();

    // Send data to the backend via PUT
    fetch(`http://52.86.154.61:3000/`, {

      method: 'PUT', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({game_id, game_name, platform, developer, publisher, release_date, genre, defaultBoxart}) // body data type must match "Content-Type" header

    });
    
    document.location.reload(true)
  }

  return (
    <div className="home">       
      <div className="container">
      {data &&
            data.map((game) => {
                return (        
                <div key={game.game_id}>
                  <img
                    className="img-fluid rounded mb-4 mb-lg-0"
                    src={defaultBoxart}
                    alt={game.game_name + " Boxart"}
                    width = "240"
                    height = "480"
                    />
                    
                  <h1 className="mt-5" >{game.game_name}</h1>         
                  <h2>Platform: {game.platform}</h2>
                  <h3>Developer: {game.developer}</h3>
                  <h3>Publisher: {game.publisher}</h3>
                  <h3 id= "Dates">Release Date: {game.release_date}</h3>
                  <h3>Genre: {game.genre}</h3>
                  <h3>Rating: {game.rating} / 5</h3>       
                </div>
                );
            })}
          <div >
            {!hidden ?
                <form>
                    <div>
                        <input type="hidden" name="game_id" id="game_id" value={game_id}></input>
                    </div>
                    <div>
                        <label htmlFor="game_name">Game Title:</label>
                        <input type="text" name="game_name" id="game_name" onChange={e => setGameName(e.target.value)} placeholder={game_name} required></input>
                    </div>
                    <div>
                        <label htmlFor="platform">Platform:</label>
                        <input type="text" name="platform" id="platform" onChange={e => setPlatform(e.target.value)} placeholder={platform} required></input>
                    </div>
                    <div>
                        <label htmlFor="developer">Developer:</label>
                        <input type="text" name="developer" id="developer" onChange={e => setDeveloper(e.target.value)} placeholder={developer} required></input>
                    </div>
                    <div>
                        <label htmlFor="publisher">Publisher:</label>
                        <input type="text" name="publisher" id="publisher" onChange={e => setPublisher(e.target.value)} placeholder={publisher} required></input>
                    </div>
                    <div>
                        <label htmlFor="release_date">Release Date:</label>
                        <input type="date" name="release_date" id="release_date" onChange={e => setReleaseDate(e.target.value)} placeholder={release_date} required></input>
                    </div>
                    <div>
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" name="genre" id="genre" onChange={e => setGenre(e.target.value)} placeholder={genre} required></input>
                    </div>
                    <div>      
                        <input type="hidden" name="boxart" id="boxart" value={boxart}></input>
                    </div>
                    <button type="reset">Reset</button>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            : null}
            <button onClick={() => setHidden(s => !s)}>
                EDIT
            </button>
          </div>
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>

      </div>
    </div>
  );
}

export default Entry;