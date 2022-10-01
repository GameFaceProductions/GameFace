package gamefaceproductions.gamefacewebsite.dto;

import lombok.*;

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
}
