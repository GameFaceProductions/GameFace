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
@Table(name = "game_media")
public class GameMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 1024)
    private String content;

    @ManyToOne
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "createdAt", "role", "posts", "gameMedia", "userFriends", "friendsList", "likes", "games", "platforms"})
    private User author;

    @OneToMany(mappedBy = "gameMedia", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"gamerTag", "region", "blocked", "email", "role", "gameMedia", "posts", "games", "platforms"})
    private Collection<MediaComments> mediaComments;

//    @OneToMany(mappedBy = "gameMedia")
//    @JsonIgnoreProperties("author")
//    private Collection<MediaComments> clips;

    @OneToMany(mappedBy = "gameMedia",  cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"gameMedia", "user"})
    private Collection<MediaLikes> likes;

    @Column(nullable = false)
    private LocalDate createdAt;
}