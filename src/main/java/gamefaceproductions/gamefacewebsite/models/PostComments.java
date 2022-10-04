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
@Table(name = "post_comment")
public class PostComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"author","likes", "posts", "userFriends", "friendsList", "users", "user"})
    private User author;

    @ManyToOne
    @JsonIgnoreProperties("posts")
    private Post posts;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(nullable = false)
    private String content;
}
