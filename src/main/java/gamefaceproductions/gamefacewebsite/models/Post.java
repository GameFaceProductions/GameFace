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
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, length = 100)
    private String title;

    @Column(nullable = false, length = 1024)
    private String content;

    @ManyToOne
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "createdAt", "role", "posts", "userFriends", "friendsList", "likes", "games", "platforms"})
    private User author;

    @OneToMany(mappedBy = "posts", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "role", "posts", "games", "platforms"})
    @ToString.Exclude
    private Collection<PostComments> postComments;

//    @OneToMany(mappedBy = "posts")
//    @JsonIgnoreProperties({"postComments", "posts"})
//    private Collection<PostComments> posts;

    @OneToMany(mappedBy = "posts", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"posts", "user"})
    @ToString.Exclude
    private Collection<PostLikes> likes;

    @Column(nullable = false)
    private LocalDate createdAt;
}