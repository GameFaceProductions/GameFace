package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.PostComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface PostCommentsRepository extends JpaRepository<PostComments, Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into post_comments (posts_id, post_comments_id) VALUES (:postsId, :commentsId)", nativeQuery = true)
    void addCommentToPost(@Param("postsId") Long postsId, @Param("commentsId") PostComments commentsId);
}