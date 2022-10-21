package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostLikesRepository extends JpaRepository<PostLikes, Long>{
    @Modifying
    @Transactional
    @Query(value = "insert into post_likes (posts_id, user_id) VALUES (:postsID, :userId)", nativeQuery = true)
    void addLiketoPost(@Param("postsID") Long postsID, @Param("userId") Long userId);
}
