package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Platform;
import gamefaceproductions.gamefacewebsite.repository.PlatformRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "api/platform", produces = "application/json")
public class PlatformController {
    private PlatformRepository platformRepository;

    @GetMapping("")
    private List<Platform> fetchAllPlatforms() {
        return platformRepository.findAll();
    }

}
