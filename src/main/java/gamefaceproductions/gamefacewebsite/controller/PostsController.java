package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.misc.FieldHelper;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.models.UserRole;
import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;

//Not sure yet what Categories repo would be in our application:
//import docrob.venusrestblog.repository.CategoriesRepository;

//Using Google login verification, not sure if email is needed:
//import docrob.venusrestblog.services.EmailService;

import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;

//Not sure if Auth is needed if using Google Login:
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
//
import java.util.List;
import java.util.Optional;

//
import static gamefaceproductions.gamefacewebsite.models.UserRole.ADMIN;

//
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", produces = "application/json")
public class PostsController {
    private final PostsRepository postRepository;
    private final UsersRepository userRepository;
//    private final CategoriesRepository categoryRepository;
//    private final EmailService emailService;
//
//
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
//        return postRepository.findById(id);
    }
//
    @PostMapping("")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createPost(@RequestBody Post newPost, OAuth2Authentication auth) {
        if (newPost.getTitle() == null || newPost.getTitle().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank!");
        }
        if (newPost.getContent() == null || newPost.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }
        System.out.println(newPost);
//        // assign  nextId to the new post
//        // make a fake author for the post
        String userName = auth.getName();
        User author = userRepository.findByUserName(userName);
        newPost.setAuthor(author);
////        newPost.setCategories(new ArrayList<>());
//
//        // use first 2 categories for the post by default
////        Category cat1 = categoryRepository.findById(2L).get();
////        Category cat2 = categoryRepository.findById(1L).get();
//
////        newPost.getCategories().add(cat1);
////        newPost.getCategories().add(cat2);
        postRepository.save(newPost);
//        emailService.prepareAndSend(newPost, "New post created by: " + newPost.getAuthor().getUserName(), "Title: " + newPost.getTitle() + "\nContent: " + newPost.getContent());
    }
//
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deletePostById(@PathVariable long id, OAuth2Authentication auth) {
        String userName = auth.getName();
        User loggedInUser = userRepository.findByUserName(userName);

        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        //grab the original post form the optional and check the logged-in user:
        Post originalPost = optionalPost.get();

        // admin can delete anyone's post. author of the post can delete only their posts
        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
        }

        postRepository.deleteById(id);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id, OAuth2Authentication auth) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post " + id + " not found");
        }
        Post originalPost = optionalPost.get();

        String userName = auth.getName();
        User loggedInUser = userRepository.findByUserName(userName);
        // admin can update anyone's post. Author of the post can update only their posts:
        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
        }

        //in case id is not in the request body (i.e., updatedPost), set it
        //with the path variable id

        updatedPost.setId(id);

        //copy any new field values FROM updatedPost TO originalPost
        BeanUtils.copyProperties(updatedPost, originalPost, FieldHelper.getNullPropertyNames(updatedPost));

        postRepository.save(updatedPost);

//        Post post = findPostById(id);
//        if(post == null) {
//            System.out.println("Post not found");
//        } else {
//            if(updatedPost.getTitle() != null) {
//                post.setTitle(updatedPost.getTitle());
//            }
//            if(updatedPost.getContent() != null) {
//                post.setContent(updatedPost.getContent());
//            }
//            return;
//        }
//        throw new RuntimeException("Post not found");
    }
}
