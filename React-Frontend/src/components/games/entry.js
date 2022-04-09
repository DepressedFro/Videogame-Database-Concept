import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import defaultBoxart from '/home/grayc/grayc-project/src/components/games/boxarts/DefaultBoxart.png';

function Entry() {
  let { postSlug } = useParams();
  const [data, setData] = useState(null);
  const [hidden, setHidden] = useState(true);
  
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
    const boop = new FormData(event.target);

    const value = Object.fromEntries(boop.entries());

    console.log({ value });
    // Send data to the backend via PUT
    fetch(`http://52.86.154.61:3000/`, {

      method: 'PUT', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value) // body data type must match "Content-Type" header

    });
    
    document.location.reload(true)
  }


    const form = document.querySelector('form');
  //check if form exists first
  if (form)
  {   form.addEventListener('submit', handleSubmit);}



  return (
    <div className="home">       
      <div class="container">
      {data &&
            data.map((game) => {
                return (        
                <>
                <img
                  class="img-fluid rounded mb-4 mb-lg-0"
                  src={defaultBoxart}
                  alt={game.game_name + " Boxart"}
                  width = "240"
                  height = "480"
                  />
                  
                <h1 className="mt-5">{game.game_name}</h1>         
                <h2>Platform: {game.platform}</h2>
                <h3>Developer: {game.developer}</h3>
                <h3>Publisher: {game.publisher}</h3>
                <h3 id= "Dates">Release Date: {game.release_date}</h3>
                <h3>Genre: {game.genre}</h3>
                <h3>Rating: {game.rating} / 5</h3>
                <div>
                    {!hidden ?
                        <form>
                            <div>
                                <input type="hidden" name="game_id" id="game_id" value={game.game_id}></input>
                            </div>
                            <div>
                                <label for="game_name">Game Title:</label>
                                <input type="text" name="game_name" id="game_name" placeholder={game.game_name} required></input>
                            </div>
                            <div>
                                <label for="platform">Platform:</label>
                                <input type="text" name="platform" id="platform" placeholder={game.platform} required></input>
                            </div>
                            <div>
                                <label for="developer">Developer:</label>
                                <input type="text" name="developer" id="developer" placeholder={game.developer} required></input>
                            </div>
                            <div>
                                <label for="publisher">Publisher:</label>
                                <input type="text" name="publisher" id="publisher" placeholder={game.publisher} required></input>
                            </div>
                            <div>
                                <label for="release_date">Release Date:</label>
                                <input type="date" name="release_date" id="release_date" placeholder={game.release_date} required></input>
                            </div>
                            <div>
                                <label for="genre">Genre:</label>
                                <input type="text" name="genre" id="genre" placeholder={game.genre} required></input>
                            </div>
                            <div>      
                                <input type="hidden" name="boxart" id="boxart" value={game.boxart}></input>
                            </div>
                            <button type="reset">Reset</button>
                            <button type="submit">Submit</button>
                        </form>
                    : null}
                    <button onClick={() => setHidden(s => !s)}>
                        EDIT
                    </button>
                </div>
                </>
                );
            })}
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>

      </div>
    </div>
  );
}

export default Entry;