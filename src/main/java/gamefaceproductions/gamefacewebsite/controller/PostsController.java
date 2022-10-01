package gamefaceproductions.gamefacewebsite.controller;

import docrob.venusrestblog.data.Post;
import docrob.venusrestblog.data.User;
import docrob.venusrestblog.repository.CategoriesRepository;
import docrob.venusrestblog.repository.PostsRepository;
import docrob.venusrestblog.repository.UsersRepository;
import docrob.venusrestblog.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static docrob.venusrestblog.data.UserRole.ADMIN;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", produces = "application/json")
public class PostsController {
    private final PostsRepository postRepository;
    private final UsersRepository userRepository;
    private final CategoriesRepository categoryRepository;
    private final EmailService emailService;


    @GetMapping("")
//    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Post> fetchPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        return postRepository.findById(id);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createPost(@RequestBody Post newPost, OAuth2Authentication auth) {
        if (newPost.getTitle() == null || newPost.getTitle().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank!");
        }
        if (newPost.getContent() == null || newPost.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }
//        System.out.println(newPost);
        // assign  nextId to the new post
        // make a fake author for the post
        String userName = auth.getName();
        User author = userRepository.findByUserName(userName);
        newPost.setAuthor(author);
//        newPost.setCategories(new ArrayList<>());

        // use first 2 categories for the post by default
//        Category cat1 = categoryRepository.findById(2L).get();
//        Category cat2 = categoryRepository.findById(1L).get();

//        newPost.getCategories().add(cat1);
//        newPost.getCategories().add(cat2);
        postRepository.save(newPost);
        emailService.prepareAndSend(newPost, "New post created by: " + newPost.getAuthor().getUserName(), "Title: " + newPost.getTitle() + "\nContent: " + newPost.getContent());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deletePostById(@PathVariable long id, OAuth2Authentication auth) {
        String userName = auth.getName();
        User loggedInUser = userRepository.findByUserName(userName);
        Long postAuthorId = fetchPostById(id).get().getAuthor().getId();
        if (loggedInUser.getId().equals(postAuthorId) || loggedInUser.getRole().equals(ADMIN)) {
            postRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be logged in as that user!");
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id, OAuth2Authentication auth) {
        // find the post to update in the posts list
        updatedPost.setId(id);
        String userName = auth.getName();
        User author = userRepository.findByUserName(userName);
        updatedPost.setAuthor(author);
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
