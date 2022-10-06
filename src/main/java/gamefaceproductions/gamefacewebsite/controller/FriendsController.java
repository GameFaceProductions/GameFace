package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.FriendsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    private void deleteFriend(@PathVariable long id) {
        friendsRepository.deleteUserById(id);
    }
//    public void deleteUserFriendsById(@PathVariable long id, @PathVariable long deleteId) {
//        Optional<User> optionalUser = friendsRepository.findById(id);
//        if (optionalUser.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
//        }
//        for (int i = 0; i < optionalUser.get().getUserFriends().size(); i++) {
//            if (optionalUser.get().getUserFriends().get(i).getId().equals(deleteId)) {
////                Optional<User> userToDelete = usersRepository.findById(deleteId);
////                User delete = userToDelete.get();
////                optionalUser.get().getUserFriends().remove(delete);
//            }
//        }
//                friendsRepository.
//    }
}