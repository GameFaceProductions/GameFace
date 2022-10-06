package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Platform;
import gamefaceproductions.gamefacewebsite.repository.PlatformRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
