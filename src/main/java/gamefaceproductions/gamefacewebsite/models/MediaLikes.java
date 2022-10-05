package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "media_likes")
public class MediaLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"userFriends", "likes"})
    private User user;

    @ManyToOne
    @JsonIgnoreProperties({"title", "author", "mediaComments", "posts", "liked", "createdAt", "gameMedia"})
    private GameMedia gameMedia;

    @Column(nullable = false, length = 100)
    private Boolean liked;
}
