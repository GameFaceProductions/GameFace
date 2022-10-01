package gamefaceproductions.gamefacewebsite.repository;

import docrob.venusrestblog.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
}
