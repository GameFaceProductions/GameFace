//
//package gamefaceproductions.gamefacewebsite.controller;
//
//import gamefaceproductions.gamefacewebsite.misc.FieldHelper;
//import gamefaceproductions.gamefacewebsite.models.*;
//import gamefaceproductions.gamefacewebsite.repository.PostLikesRepository;
//import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
//import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
//
////Not sure yet what Categories repo would be in our application:
////import docrob.venusrestblog.repository.CategoriesRepository;
//
////Using Google login verification, not sure if email is needed:
////import docrob.venusrestblog.services.EmailService;
//
//import lombok.AllArgsConstructor;
//import org.springframework.beans.BeanUtils;
//import org.springframework.http.HttpStatus;
//
////Not sure if Auth is needed if using Google Login:
////import org.springframework.security.access.prepost.PreAuthorize;
////import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
////
//import java.util.Collection;
//import java.util.List;
//import java.util.Optional;
//
////
//import static gamefaceproductions.gamefacewebsite.models.UserRole.ADMIN;
//
////
//@AllArgsConstructor
//@RestController
//@RequestMapping(value = "/api/posts/likes", produces = "application/json")
//
//public class LikesController {
//    private PostsRepository postRepository;
//    private UsersRepository userRepository;
//    private PostLikesRepository postLikesRepository;
//
//
//    @GetMapping("")
//////    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public List<PostLikes> fetchLikes() {
//
//        return postLikesRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public Optional<PostLikes> fetchPostById(@PathVariable long id) {
//        Optional<PostLikes> postLikes = postLikesRepository.findById(id);
//        if(postLikes.isEmpty()){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Liked status " + id + " not found");
//        }
//        return postLikes;
////        return postRepository.findById(id);
//    }
//
//    @DeleteMapping("/{id}")
////    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
//    public void deletePostById(@PathVariable long id) {
////        String userName = "valeriar";
////        User loggedInUser = userRepository.findByUserName(userName);
//
//        Optional<PostLikes> likedPosts = postLikesRepository.findById(id);
//        if(likedPosts.isEmpty()){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Likes " + id + " not found");
//        }
////        //grab the original post form the optional and check the logged-in user:
////        Post originalPost = optionalPost.get();
////
////        // admin can delete anyone's post. author of the post can delete only their posts:
////        // Comment out for now until security/auth is set up:
////        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
////            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
////        }
//
//        postLikesRepository.deleteById(id);
//
//    }
//}
