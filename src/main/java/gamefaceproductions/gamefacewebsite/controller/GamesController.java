package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Games;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.repository.GamesRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/games", produces = "application/json")
public class GamesController {
    private GamesRepository gamesRepository;

    @GetMapping("")
    private List<Games> fetchAllGames() {
        return gamesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Games> fetchGameById(long id) {
        Optional<Games> optionalGames = gamesRepository.findById(id);
        if (optionalGames.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game id " + id + " not found");
        }
        return optionalGames;
    }

    @PostMapping("/{myd}/{gameId}")
    public void addGameById(@PathVariable long gameId, @PathVariable long myd){
        gamesRepository.addGameById(gameId, myd);
    }

    @DeleteMapping("/{myd}/{gameId}")
    public void deleteGameById(@PathVariable long gameId, @PathVariable long myd) {
        gamesRepository.deleteGameById(gameId, myd);
    }

}
