package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface GamesRepository extends JpaRepository<Games, Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into user_games (user_id, game_id) VALUES (:userId, :gameId)", nativeQuery = true)
    void addGameById(@Param("userId") Long userID, @Param("gameId") Long gamedId);

//    INSERT INTO games for inserting each game id as it is gathered from RAWG
    @Modifying
    @Transactional
    @Query(value = "insert into games (game, game_id) VALUES (:game, :gameId)", nativeQuery = true)
    void addGameToGames(@Param("game") String game, @Param("gameId") Long gameId);

    @Modifying
    @Transactional
    @Query(value = "delete from user_games WHERE user_id = :userId AND game_id = :gameId", nativeQuery = true)
    void deleteGameById(@Param("userId") Long userID, @Param("gameId") Long gameId);
}
