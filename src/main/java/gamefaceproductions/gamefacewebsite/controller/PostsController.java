package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.misc.FieldHelper;
import gamefaceproductions.gamefacewebsite.models.*;
import gamefaceproductions.gamefacewebsite.repository.PostLikesRepository;
import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;

//import gamefaceproductions.gamefacewebsite.services.EmailService;


import gamefaceproductions.gamefacewebsite.services.AuthBuddy;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;


//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
//
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

//
import static gamefaceproductions.gamefacewebsite.models.UserRole.ADMIN;

//
@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", produces = "application/json")
public class PostsController {
    private PostsRepository postRepository;
    private UsersRepository userRepository;
    private PostLikesRepository postLikesRepository;
    private AuthBuddy authBuddy;

//Might not need if using Google login services:
//    private final EmailService emailService;
    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Post> fetchPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        return optionalPost;

    }
//
    @PostMapping("")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createPost(@RequestBody Post newPost, @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        User loggedInUser = authBuddy.getUserFromAuthHeader(authHeader);

        if (newPost.getTitle() == null || newPost.getTitle().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank!");
        }
        if (newPost.getContent() == null || newPost.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }
        System.out.println(newPost);

        newPost.setAuthor(loggedInUser);
        newPost.setCreatedAt(LocalDate.now());

        //  String userName = auth.getName();

//        String userName = "Lunalon";
//
//        User author = userRepository.findByUserName(userName);
//        newPost.setAuthor(author);
//        newPost.setCreatedAt(LocalDate.now());
        postRepository.save(newPost);
//        emailService.prepareAndSend(newPost, "New post created by: " + newPost.getAuthor().getUserName(), "Title: " + newPost.getTitle() + "\nContent: " + newPost.getContent());
    }
//
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deletePostById(@PathVariable long id) {
        postRepository.deleteById(id);
    }



    @PutMapping("/{id}")
////    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post " + id + " not found");
        }

        Post originalPost = optionalPost.get();

        //Add in auth user role once auth and login is setup.

        updatedPost.setId(id);
//
//        //copy any new field values FROM updatedPost TO originalPost
        BeanUtils.copyProperties(updatedPost, originalPost, FieldHelper.getNullPropertyNames(updatedPost));
//
        postRepository.save(originalPost);
//
    }
}
