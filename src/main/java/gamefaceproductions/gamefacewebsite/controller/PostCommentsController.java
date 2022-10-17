package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.MediaComments;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.PostComments;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.PostCommentsRepository;
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
@RequestMapping(value = "/api/postcomments", produces = "application/json")
public class PostCommentsController {

    PostCommentsRepository postCommentsRepository;
    private AuthBuddy authBuddy;

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
    @PostMapping("")
    public void createPostComment(@RequestBody PostComments newPostComment, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);

        if (newPostComment.getContent() == null || newPostComment.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }

        System.out.println(newPostComment);

        newPostComment.setAuthor(loggedInUser);
        newPostComment.setCreatedAt(LocalDate.now());
        postCommentsRepository.save(newPostComment);

    }
}
