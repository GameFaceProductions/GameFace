package gamefaceproductions.gamefacewebsite.dto;

import gamefaceproductions.gamefacewebsite.models.UserRole;
import lombok.*;

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
    private String profilePic;
}
