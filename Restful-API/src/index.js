// nodemon used to restart server on changes

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');

//create a connection pool to speed up connections
const pool = mysql.createPool ({
    connectionLimit : 20,
    host            : 'localhost',
    user            : 'grayc',
    password        : 'ZTZc3_@sRAqf',
    database        : 'grayc'
}); 

// create the express app
const app = express();

//useful for when we can't control our ports
const port = process.env.PORT || 3000;

//adds some protection aganist HTTP attacks
//might not be useful due to NGINX on host server
app.use(helmet());

//converts request bodies into json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// enables CORS for all requests, useful when making APIs
app.use(cors());

// logs my HTTP requests and says how long they took
app.use(morgan('tiny'));

//ADD a value to games
app.post('', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err
      
      const parameters = req.body
      
      connection.query('INSERT INTO games SET ?', parameters, (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(`The game "${parameters.game_name}" was successfully added to the database` )
          } else {
              console.log(err)
          }

          console.log(parameters)
      })
  })
})

//READ specific value from games
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        
        connection.query('SELECT * from games WHERE games.game_id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from the games table is: \n', rows)
        })
    })
})

//list all values from games
app.get('', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err
      
      connection.query('SELECT * from games', (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(rows)
          } else {
              console.log(err)
          }

          console.log('The data from the games table is: \n', rows)
      })
  })
})


//UPDATE a value in games
app.put('', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err
      
      const {game_id, game_name, developer, publisher, platform, release_date, genre, boxart} = req.body


      connection.query('UPDATE games SET game_name = ?, developer = ?, publisher = ?, platform = ?, release_date = ?, genre = ?, boxart = ? WHERE game_id = ?', [game_name, platform, developer, publisher, release_date, genre, boxart, game_id], (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(`The game "${game_name}" was updated.`)
          } else {
              console.log(err)
          }

          console.log(req.body)
      })
  })
})

// DELETE a value in games
app.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query('DELETE FROM games WHERE game_id = ?', [req.params.id], (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(`The game with the ID ${req.params.id} was deleted`)
          } else {
              console.log(err)
          }

          console.log(req.body)
      })
  })
})

// start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

