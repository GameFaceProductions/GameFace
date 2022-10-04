package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Games;
import gamefaceproductions.gamefacewebsite.repository.GamesRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/games", produces = "application/json")
public class GamesController {
    private GamesRepository gamesRepository;

    @GetMapping("/games")
    private List<Games> fetchAllGames() {
        return gamesRepository.findAll();
    }

//    @GetMapping("/search")
//    private Games fetchGameByGameName(@RequestParam String gameName) {
//        Games game = gamesRepository.findById(gameName);
//        if(game == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game " + gameName + " not found");
//        }
//        return game;
//    }
}
