package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikesRepository extends JpaRepository<Post, Long>{
}
