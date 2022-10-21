package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.MediaLikes;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.PostLikes;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.PostLikesRepository;
import gamefaceproductions.gamefacewebsite.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/postlikes", produces = "application/json")
public class PostLikesController {
    private AuthBuddy authBuddy;
    PostLikesRepository postLikesRepository;
    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<PostLikes> fetchPostLikes() {

        return postLikesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<PostLikes> fetchPostLikesById(@PathVariable long id) {
        Optional<PostLikes> optionalPostLike = postLikesRepository.findById(id);
        if (optionalPostLike.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post like id " + id + " not found");
        }
        return optionalPostLike;
//        return postRepository.findById(id);
    }

    @PostMapping("/{postsId}/{userId}")
    public void addLike(@PathVariable long postsId, @PathVariable long userId, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);
        postLikesRepository.addLiketoPost(postsId, userId);
    }

}
