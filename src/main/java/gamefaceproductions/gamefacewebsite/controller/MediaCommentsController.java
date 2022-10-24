package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.GameMedia;
import gamefaceproductions.gamefacewebsite.models.MediaComments;
import gamefaceproductions.gamefacewebsite.repository.MediaCommentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/mediacomments", produces = "application/json")
public class MediaCommentsController {

    MediaCommentsRepository mediaCommentsRepository;

    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<MediaComments> fetchMediaComments() {

        return mediaCommentsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<MediaComments> fetchMediaCommentById(@PathVariable long id) {
        Optional<MediaComments> optionalMediaComment = mediaCommentsRepository.findById(id);
        if (optionalMediaComment.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media comment id " + id + " not found");
        }
        return optionalMediaComment;
//        return postRepository.findById(id);
    }
}
