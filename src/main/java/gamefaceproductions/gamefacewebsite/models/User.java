package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String userName;

    @Column(nullable = false, unique = true, length = 50)
    private String gamerTag;

    @Column(nullable = false, length = 25)
    private String region;

    @Column(nullable = false, length = 10)
    private Boolean blocked;

    @Column()
    private String backdrop_url;

    @Column()
    private String avatar_url;

    @Email
    @NotEmpty
    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column
    private UserRole role;

    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties({"posts", "likes", "createdAt", "author"})
    @ToString.Exclude
    private Collection<Post> posts;
    
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user", "posts"})
    @ToString.Exclude
    private Collection<PostLikes> likes;
    
    
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "user_friends",
            joinColumns = { @JoinColumn(name = "user_id")},
            inverseJoinColumns={@JoinColumn(name="friend_id")})
    @JsonIgnoreProperties({"friendsList", "likes", "userName", "gamerTag", "region", "blocked", "email", "createdAt", "role", "userFriends", "posts"})
    @ToString.Exclude
    private List<User> userFriends;

//    @ManyToMany(cascade = CascadeType.MERGE, mappedBy = "userFriends")
//    @JsonIgnoreProperties({"userFriends", "likes", "userName", "gamerTag", "region", "blocked", "email", "createdAt", "role", "friendsList", "posts"})
//    private List<User> friendsList;


    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Games.class)
    @JoinTable(
            name="user_games",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="game_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties("users")
    @ToString.Exclude
    private Collection<Games> games;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Platform.class)
    @JoinTable(
            name="user_platforms",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="platform_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties("users")
    @ToString.Exclude
    private Collection<Platform> platforms;


}
