package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Platform;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.FriendsRepository;
import gamefaceproductions.gamefacewebsite.repository.PlatformRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.Column;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "api/friends", produces = "application/json")
public class FriendsController {
    private FriendsRepository friendsRepository;
    private UsersRepository usersRepository;

    @GetMapping("")
    private List<User> fetchAllUserFriends() {
        return friendsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> fetchUserFriendsById(@PathVariable long id) {
        Optional<User> optionalUser = friendsRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }
        return optionalUser;
    }

    @DeleteMapping("/{id}")
    public void removeFriend(@PathVariable User id) {
        System.out.println(friendsRepository.findAll());
    }
}