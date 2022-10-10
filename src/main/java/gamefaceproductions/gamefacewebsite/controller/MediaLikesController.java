package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.GameMedia;
import gamefaceproductions.gamefacewebsite.models.MediaLikes;
import gamefaceproductions.gamefacewebsite.repository.MediaLikesRepository;
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
@RequestMapping(value = "/api/medialikes", produces = "application/json")
public class MediaLikesController {
    MediaLikesRepository mediaLikesRepository;

    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<MediaLikes> fetchMediaLikes() {

        return mediaLikesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<MediaLikes> fetchMediaLikesById(@PathVariable long id) {
        Optional<MediaLikes> optionalGameMediaLike = mediaLikesRepository.findById(id);
        if (optionalGameMediaLike.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media like id " + id + " not found");
        }
        return optionalGameMediaLike;
//        return postRepository.findById(id);
    }
}
