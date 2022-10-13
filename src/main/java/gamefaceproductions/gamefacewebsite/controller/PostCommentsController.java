package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.MediaComments;
import gamefaceproductions.gamefacewebsite.models.PostComments;
import gamefaceproductions.gamefacewebsite.repository.PostCommentsRepository;
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
@RequestMapping(value = "/api/postcomments", produces = "application/json")
public class PostCommentsController {

    PostCommentsRepository postCommentsRepository;

    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<PostComments> fetchPostComments() {

        return postCommentsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<PostComments> fetchPostCommentById(@PathVariable long id) {
        Optional<PostComments> optionalPostComment = postCommentsRepository.findById(id);
        if (optionalPostComment.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post comment id " + id + " not found");
        }
        return optionalPostComment;
//        return postRepository.findById(id);
    }
    //POST:
}
