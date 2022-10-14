package gamefaceproductions.gamefacewebsite.repository;

import gamefaceproductions.gamefacewebsite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface FriendsRepository extends JpaRepository<User, Long> {
    @Modifying
    @Transactional
    @Query(value = "delete from user_friends WHERE user_id = :userId AND friend_id = :friendId", nativeQuery = true)
    void deleteFriendFromUser(@Param("userId") Long userID, @Param("friendId") Long friendId);

    @Modifying
    @Transactional
    @Query(value = "insert into user_friends (user_id, friend_id) VALUES (:userId, :friendId)", nativeQuery = true)
    void addFriendFromUser(@Param("userId") Long userID, @Param("friendId") Long friendId);
}
