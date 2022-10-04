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
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "createdAt", "role", "userFriends", "friendsList", "likes", "posts"})
    private User author;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"content", "posts" })
    private Post posts;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(nullable = false)
    private String content;
}
