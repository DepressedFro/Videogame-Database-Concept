SELECT * from games \
        INNER JOIN  publisher_games ON games.game_id = publisher_games.game_id \
        INNER JOIN publishers ON publisher_games.publisher_id = publishers.publisher_id \
        INNER JOIN developer_games ON games.game_id = developer_games.game_id \
        INNER JOIN developers ON developer_games.developer_id = developers.developer_id \
        WHERE games.game_id = ?