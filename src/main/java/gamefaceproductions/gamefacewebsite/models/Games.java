package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import gamefaceproductions.gamefacewebsite.dto.UserFetchDto;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="games")

public class Games {
    @Id
    @Column(nullable = false, unique = true)
    private Long gameId;

    @Column(nullable = false, unique = true)
    private String game;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = User.class)
    @JoinTable(
            name="user_games",
            joinColumns = {@JoinColumn(name = "game_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="user_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties({"games", "role", "email", "backdrop_url", "avatar_url", "createdAt", "posts", "likes", "users", "userFriends", "platforms", "postComments"})
    private Collection<UserFetchDto> users;
}
