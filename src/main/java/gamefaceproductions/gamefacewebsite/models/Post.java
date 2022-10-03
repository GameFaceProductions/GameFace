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

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 1024)
    private String content;

    @ManyToOne
    @JsonIgnoreProperties({"posts"})
    private User author;

    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private Collection<PostComments> postComments;

    @OneToMany(mappedBy = "posts")
    @JsonIgnoreProperties("author")
    private Collection<PostComments> posts;

    @OneToMany(mappedBy = "posts")
    @JsonIgnoreProperties("posts")
    private Collection<PostLikes> likes;

    @Column(nullable = false)
    private LocalDate createdAt;
}