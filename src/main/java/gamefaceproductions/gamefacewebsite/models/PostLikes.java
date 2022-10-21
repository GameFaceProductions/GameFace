package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "post_likes")
public class PostLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"userFriends", "likes", "posts", "games", "userName", "backdrop_url", "avatar_url", "postComments", "gameMedia", "gamerTag", "region", "blocked", "email", "createdAt", "role", "platforms"})
    private User user;

    @ManyToOne
    @JsonIgnoreProperties({"title", "author", "postComments", "user", "posts", "liked", "createdAt", "gameMedia", "content", "likes"})
    private Post posts;

//    @Column(nullable = false, length = 100)
//    @JsonIgnoreProperties("posts")
//    private Boolean liked;
}
