package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.models.GameMedia;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.models.UserRole;
import gamefaceproductions.gamefacewebsite.repository.GameMediaRepository;
import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/gamemedia", produces = "application/json")
public class MediaController {
    private final PostsRepository postRepository;
    private final UsersRepository userRepository;
    private final GameMediaRepository gameMediaRepository;
//    private final CategoriesRepository categoryRepository;
//    private final EmailService emailService;
//
//
    @GetMapping("")
////    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<GameMedia> fetchMedia() {

        return gameMediaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<GameMedia> fetchMediaById(@PathVariable long id) {
        Optional<GameMedia> optionalGameMedia = gameMediaRepository.findById(id);
        if(optionalGameMedia.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media id " + id + " not found");
        }
        return optionalGameMedia;
//        return postRepository.findById(id);
    }
//
    @PostMapping("")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createGameMedia(@RequestBody GameMedia newGameMedia) {
        if (newGameMedia.getTitle() == null || newGameMedia.getTitle().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank!");
        }
        if (newGameMedia.getContent() == null || newGameMedia.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank!");
        }
        System.out.println(newGameMedia);
//        // assign  nextId to the new gameMedia
//        // make a fake author for the new gameMedia
        String userName = "Scrimm";
        User author = userRepository.findByUserName(userName);
        newGameMedia.setAuthor(author);
        gameMediaRepository.save(newGameMedia);
//        emailService.prepareAndSend(newPost, "New post created by: " + newPost.getAuthor().getUserName(), "Title: " + newPost.getTitle() + "\nContent: " + newPost.getContent());
    }
//
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deletePostById(@PathVariable long id) {
        String userName = "Scrimm";
        User loggedInUser = userRepository.findByUserName(userName);

        Optional<GameMedia> optionalGameMedia = gameMediaRepository.findById(id);
        if(optionalGameMedia.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media id " + id + " not found");
        }
        //grab the original post form the optional and check the logged-in user:
        GameMedia originalGameMedia = optionalGameMedia.get();

//        // admin can delete anyone's post. author of the post can delete only their posts
//        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
//        }
        gameMediaRepository.deleteById(id);
    }
//
//
//    @PutMapping("/{id}")
////    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
//    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id, OAuth2Authentication auth) {
//        Optional<Post> optionalPost = postRepository.findById(id);
//        if(optionalPost.isEmpty()){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post " + id + " not found");
//        }
//        Post originalPost = optionalPost.get();
//
//        String userName = auth.getName();
//        User loggedInUser = userRepository.findByUserName(userName);
//        // admin can update anyone's post. Author of the post can update only their posts:
//        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
//        }
//
//        //in case id is not in the request body (i.e., updatedPost), set it
//        //with the path variable id
//
//        updatedPost.setId(id);
//
//        //copy any new field values FROM updatedPost TO originalPost
//        BeanUtils.copyProperties(updatedPost, originalPost, FieldHelper.getNullPropertyNames(updatedPost));
//
//        postRepository.save(updatedPost);
//
////        Post post = findPostById(id);
////        if(post == null) {
////            System.out.println("Post not found");
////        } else {
////            if(updatedPost.getTitle() != null) {
////                post.setTitle(updatedPost.getTitle());
////            }
////            if(updatedPost.getContent() != null) {
////                post.setContent(updatedPost.getContent());
////            }
////            return;
////        }
////        throw new RuntimeException("Post not found");
//    }
}
