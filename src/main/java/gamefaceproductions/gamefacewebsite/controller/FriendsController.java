package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.Platform;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.FriendsRepository;
import gamefaceproductions.gamefacewebsite.repository.PlatformRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import gamefaceproductions.gamefacewebsite.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
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
    private AuthBuddy authBuddy;

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

    @PostMapping("/{id}/{myid}")
    public void addFriend(@PathVariable long id, @PathVariable long myid, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);
        System.out.println(loggedInUser);
        System.out.println(id);
        System.out.println(myid);
        friendsRepository.addFriendFromUser(id, myid);
        friendsRepository.addFriendFromUser(myid, id);
    }
    //    BLOCKED THIS SHIZ IS HARD. Maybe need to make user_id and friend_id sever as composite key so
//    friends can be deleted based on the unique friendship (unidirectional) which preserves friends
//    so if user1 removes user2, user2 can still consider user1 a friend on their end... Or bidirectional if easier.
//    Just need a good way to target each ROW in the user_friends table to correctly delete based on user_id's.
    @DeleteMapping("/{id}/{myid}")
    public void removeFriend(@PathVariable long id, @PathVariable long myid,  @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);
        System.out.println(loggedInUser);
        System.out.println(id);
        System.out.println(myid);
        friendsRepository.deleteFriendFromUser(id, myid);
        friendsRepository.deleteFriendFromUser(myid, id);
    }
}