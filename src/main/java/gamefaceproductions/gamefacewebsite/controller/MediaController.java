package gamefaceproductions.gamefacewebsite.controller;

import gamefaceproductions.gamefacewebsite.misc.FieldHelper;
import gamefaceproductions.gamefacewebsite.models.GameMedia;
import gamefaceproductions.gamefacewebsite.models.Post;
import gamefaceproductions.gamefacewebsite.models.User;
import gamefaceproductions.gamefacewebsite.models.UserRole;
import gamefaceproductions.gamefacewebsite.repository.GameMediaRepository;
import gamefaceproductions.gamefacewebsite.repository.PostsRepository;
import gamefaceproductions.gamefacewebsite.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Date;
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
        if (optionalGameMedia.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media id " + id + " not found");
        }
        return optionalGameMedia;
//        return postRepository.findById(id);
    }

    //
    @PostMapping("/create")
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
//        String userName = "Scrimm";
//        User author = userRepository.findByUserName(userName);
//        newGameMedia.setAuthor(author);
        LocalDate date = LocalDate.now();
        newGameMedia.setCreatedAt(date);
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
        if (optionalGameMedia.isEmpty()) {
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
    @PutMapping("/{id}")
//    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updateGameMedia(@RequestBody GameMedia updatedGameMedia, @PathVariable long id) {
        Optional<GameMedia> optionalGameMedia = gameMediaRepository.findById(id);
        if (optionalGameMedia.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media " + id + " not found");
        }
        GameMedia originalGameMedia = optionalGameMedia.get();
        User author = originalGameMedia.getAuthor();
//        Long authorId = originalGameMedia.getAuthor().getId();

//        String userName = auth.getName();
//        User loggedInUser = userRepository.findByUserName(userName);
        // admin can update anyone's post. Author of the post can update only their posts:
//        if(loggedInUser.getRole() != UserRole.ADMIN && originalPost.getAuthor().getId() != loggedInUser.getId()) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized Action!");
//        }

        //in case id is not in the request body (i.e., updatedPost), set it
        //with the path variable id


        updatedGameMedia.setAuthor(author);
        updatedGameMedia.setId(id);

        //copy any new field values FROM updatedPost TO originalPost
        BeanUtils.copyProperties(updatedGameMedia, originalGameMedia, FieldHelper.getNullPropertyNames(updatedGameMedia));

        gameMediaRepository.save(updatedGameMedia);
    }
}
