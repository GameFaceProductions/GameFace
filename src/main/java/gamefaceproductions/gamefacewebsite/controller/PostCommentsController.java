package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.MediaComments;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.PostComments;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.repository.PostCommentsRepository;
import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import gamefaceproductions.gamefacewebsite.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/postcomments", produces = "application/json")
public class PostCommentsController {

    PostCommentsRepository postCommentsRepository;
    PostsRepository postsRepository;
    UsersRepository usersRepository;
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

    @PostMapping("/postcomment/{id}")
    public ResponseEntity<PostComments> createPostComment(@RequestBody PostComments newPostComment, @PathVariable("id") long postId, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) throws Exception {

        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);
        Optional<User> user = usersRepository.findById(loggedInUser.getId());
        Optional<Post> currentPost = postsRepository.findById(postId);
        if (currentPost.isPresent() && user.isPresent()) {
            // TODO: Add the comment to the post
            // TODO: Associate the comment to the user
            // TODO: add the time to the updated time

            PostComments newComment = new PostComments();
            newComment.setContent(newPostComment.getContent());
            newComment.setAuthor(user.get());
            newComment.setPosts(currentPost.get());
            newComment.setCreatedAt(LocalDate.now());
            postCommentsRepository.save(newComment);
            return new ResponseEntity<>(newComment, new HttpHeaders(), HttpStatus.OK);
        } else {
            System.out.println("DUMMY, THAT ISN'T A POST");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}