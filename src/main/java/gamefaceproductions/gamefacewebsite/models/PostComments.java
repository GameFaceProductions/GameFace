package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "post_comments")
public class PostComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "createdAt", "role", "userFriends", "friendsList", "likes", "gameMedia", "posts", "games", "platforms"})
    private User author;

    //removed the (cascade = CascadeType.ALL, fetch = FetchType.LAZY) from manytoone
    @ManyToOne
    @JsonIgnoreProperties({"title", "author", "postComments", "user", "posts", "liked", "createdAt", "gameMedia", "content", "likes"})
    private Post posts;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(nullable = false)
    private String content;
}
