package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.repository.GamesRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping
public class GamesController {
    private GamesRepository gamesRepository;
}
