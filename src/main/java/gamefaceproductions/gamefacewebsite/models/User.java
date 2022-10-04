package gamefaceproductions.gamefacewebsite.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

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

    @Column(nullable = false, unique = true, length = 25)
    private String region;

    @Column(nullable = false, unique = true, length = 10)
    private String blocked;

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
    @JsonIgnoreProperties("author")
    private Collection<Post> posts;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            targetEntity = Games.class)
    @JoinTable(
            name="users_games",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="games_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    @JsonIgnoreProperties("users")
    private Collection<Games> games;
}
