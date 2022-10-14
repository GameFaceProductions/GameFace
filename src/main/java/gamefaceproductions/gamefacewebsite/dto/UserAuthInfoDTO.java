package gamefaceproductions.gamefacewebsite.dto;

import gamefaceproductions.gamefacewebsite.models.*;
import lombok.*;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserAuthInfoDTO {
    private Long id;
    private String userName;
    private String email;
    private UserRole role;
    private String avatar_url;
    private List <User> userFriends;
    private Collection <Games> games;
    private Collection<Platform> platforms;
    private Collection<PostLikes> likes;
    private Collection<Post> posts;
    private String gamerTag;
}
