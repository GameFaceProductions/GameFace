package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.MediaLikes;
import gamefaceproductions.gamefacewebsite.models.PostLikes;
import gamefaceproductions.gamefacewebsite.repository.PostLikesRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/postlikes", produces = "application/json")
public class PostLikesController {
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
}
