CREATE TABLE IF NOT EXISTS publishers(
    publisher_id int NOT NULL AUTO_INCREMENT,
    publisher_name varchar(200) NOT NULL,
    year_created year NULL,
    PRIMARY KEY (publisher_id)
);

CREATE TABLE IF NOT EXISTS developers(
    developer_id int NOT NULL AUTO_INCREMENT,
    developer_name varchar(200) NOT NULL,
    year_created year NULL,
    PRIMARY KEY (developer_id)
);

CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(32) NOT NULL,
    UNIQUE (username, email),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS games(
    game_id int NOT NULL AUTO_INCREMENT,
    game_name varchar(400) NOT NULL,
    platform varchar(100) NOT NULL,
    release_date date NOT NULL,
    genre varchar(20) NULL,
    rating_total float NULL DEFAULT 0,
    times_rated int NULL DEFAULT 0,
    boxart varchar(2000) NULL DEFAULT 'N/A',
    PRIMARY KEY (game_id)
);

CREATE TABLE IF NOT EXISTS publisher_games(
    publisher_id int NOT NULL,
    game_id int NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    PRIMARY KEY (publisher_id, game_id)
);

CREATE TABLE IF NOT EXISTS developer_games(
    developer_id int NOT NULL,
    game_id int NOT NULL,
    FOREIGN KEY (developer_id) REFERENCES developers(developer_id) ON DELETE CASCADE
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    PRIMARY KEY (developer_id, game_id)
);

CREATE TABLE IF NOT EXISTS user_ratings(
    user_id int NOT NULL,
    game_id int NOT NULL,
    rating float NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, game_id)
);

#change delimiter, then increment counter and add to rating total in games table
#afterwards change delimiter back
DROP TRIGGER IF EXISTS trigger_user_ratings_insert;
DELIMITER $
CREATE TRIGGER trigger_user_ratings_insert
AFTER INSERT on user_ratings 
FOR EACH ROW
    BEGIN
        UPDATE games SET rating_total = rating_total + NEW.rating WHERE NEW.game_id = games.game_id;
        UPDATE games SET times_rated = times_rated + 1 WHERE NEW.game_id = games.game_id;
    END;
$
DELIMITER ;

#only need to subtract old rating then add new rating in games table
DROP TRIGGER IF EXISTS trigger_user_ratings_update;
DELIMITER $
CREATE TRIGGER trigger_user_ratings_update
AFTER UPDATE on user_ratings
FOR EACH ROW
    BEGIN
        UPDATE games SET rating_total = rating_total - OLD.rating + NEW.rating WHERE NEW.game_id = games.game_id;
    END;
$
DELIMITER ;

#subtract rating and decrement rating counter in games table
DROP TRIGGER IF EXISTS trigger_user_ratings_delete;
DELIMITER $
CREATE TRIGGER trigger_user_ratings_delete
AFTER DELETE on user_ratings
FOR EACH ROW
    BEGIN
        UPDATE games SET rating_total = rating_total - OLD.rating WHERE OLD.game_id = games.game_id;
        UPDATE games SET times_rated = times_rated - 1 WHERE OLD.game_id = games.game_id;
    END;
$
DELIMITER ;