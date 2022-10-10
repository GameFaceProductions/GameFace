package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.PostComments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentsRepository extends JpaRepository<PostComments, Long> {
}
