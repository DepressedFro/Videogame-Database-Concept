INSERT INTO publishers (publisher_id, publisher_name, year_created) VALUES
(1, "Microsoft", 1975),
(2, "Nintendo", 1910),
(3, "Sony", 1946);

INSERT INTO developers (developer_id, developer_name, year_created) VALUES
(1, "Microsoft", 1975),
(2, "Nintendo", 1910),
(3, "Sony", 1946);

INSERT INTO users (user_id, username, email, password) VALUES
(1, "Qwerty", "abc@abc.com", "1234"),
(2, "Security God", "yes@yahoo.com", "999999");

INSERT INTO games (game_id, game_name, developer_id, publisher_id, platform, release_date, genre) VALUES
(1, "The Last of Us", 3, 3, "PS3", '2013-08-08', "Action"),
(2, "Super Mario Bros. 3", 2, 2, "Famicom", '1988-08-08', "Platformer");

INSERT INTO publisher_games VALUES 
(3, 1),
(2, 1);

INSERT INTO developer_games VALUES 
(3, 1),
(2, 1);

INSERT INTO user_ratings VALUES
(1, 1, 5.0),
(2, 2, 4.5);