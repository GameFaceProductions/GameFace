package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.Games;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepository extends JpaRepository<Games, Long> {
//    Games findById(String id);
}
