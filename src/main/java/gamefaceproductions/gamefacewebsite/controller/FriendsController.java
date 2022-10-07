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
import java.util.Collections;
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

//    BLOCKED THIS SHIZ IS HARD. Maybe need to make user_id and friend_id sever as composite key so
//    friends can be deleted based on the unique friendship (unidirectional) which preserves friends
//    so if user1 removes user2, user2 can still consider user1 a friend on their end... Or bidirectional if easier.
//    Just need a good way to target each ROW in the user_friends table to correctly delete based on user_id's.
    @DeleteMapping("/{id}")
    public void removeFriend(@PathVariable Long id) {
        System.out.println(friendsRepository.findAll().get(1).getUserFriends());
        friendsRepository.deleteById(id);
    }
}