package gamefaceproductions.gamefacewebsite.dto;

import gamefaceproductions.gamefacewebsite.models.Games;
import gamefaceproductions.gamefacewebsite.models.User;
import lombok.*;

import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
///**
// * this is the user dto returned when calling /api/users (or fetch all users)
// */
public class UserFetchDto {
    private Long id;
    private String userName;
    private String email;
    private String gamer_tag;
    private String avatar_url;
    private String backdrop_url;
    private List<User> userFriends;
    private Collection<Games> games;
}
