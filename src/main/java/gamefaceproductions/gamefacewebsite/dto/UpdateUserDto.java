package gamefaceproductions.gamefacewebsite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UpdateUserDto {
    private long id;
    private String username;
    private String email;

    @Override
    public String toString() {
        return super.toString();
    }

    //TODO: add constructors, getters, and setters

    //TODO: add a toString() override
}
