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
    @JsonIgnoreProperties({"userFriends", "likes"})
    private User user;

    @ManyToOne
    @JsonIgnoreProperties({"title", "author", "postComments", "posts", "likes", "createdAt"})
    private Post posts;

    @Column(nullable = false, length = 100)
    @JsonIgnoreProperties("likes")
    private Boolean liked;
}
