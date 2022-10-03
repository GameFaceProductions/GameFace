//package gamefaceproductions.gamefacewebsite.controller;
//
//import docrob.venusrestblog.data.User;
//import docrob.venusrestblog.data.UserRole;
//import docrob.venusrestblog.dto.UserFetchDto;
//import docrob.venusrestblog.misc.FieldHelper;
//import docrob.venusrestblog.repository.UsersRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.BeanUtils;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@AllArgsConstructor
//@RestController
//@RequestMapping(value = "/api/users", produces = "application/json")
//public class UsersController {
//    private UsersRepository usersRepository;
//    private PasswordEncoder passwordEncoder;
//
//    @GetMapping("")
//    public List<UserFetchDto> fetchUsers() {
////        return usersRepository.fetchUserDTOs();
//        List<User> users = usersRepository.findAll();
//        List<UserFetchDto> userDTOs = new ArrayList<>();
//
//        for (User user : users) {
//            UserFetchDto userDTO = new UserFetchDto();
//            userDTO.setId(user.getId());
//            userDTO.setUserName(user.getUserName());
//            userDTO.setEmail(user.getEmail());
//            userDTOs.add(userDTO);
//        }
//        return userDTOs;
//    }
//
//    @GetMapping("/{id}")
//    public Optional<User> fetchUserById(@PathVariable long id) {
//        Optional<User> optionalUser = usersRepository.findById(id);
//        if (optionalUser.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
//        }
//        return optionalUser;
//    }
//
//    @GetMapping("/me")
//    private Optional<User> fetchMe(OAuth2Authentication auth) {
//        String userName = auth.getName();
//        User user = usersRepository.findByUserName(userName);
//        return Optional.of(user);
//    }
//
////    @GetMapping("/username/{userName}")
////    private User fetchByUserName(@PathVariable String userName) {
////
////    }
//
////    @GetMapping("/email/{email}")
////    private User fetchByEmail(@PathVariable String email) {
////        User user = findUserByEmail(email);
////        if(user == null) {
////            // what to do if we don't find it
////            throw new RuntimeException("I don't know what I am doing");
////        }
////        return user;
////    }
//
//    @PostMapping("/create")
//    public void createUser(@RequestBody User newUser) {
//        // TODO: validate new user fields
//        if (newUser.getUserName().contains("Chase")) {
//            newUser.setRole(UserRole.ADMIN);
//        } else {
//            newUser.setRole(UserRole.USER);
//        }
//        String plainTextPassword = newUser.getPassword();
//        String encryptedPassword = passwordEncoder.encode(plainTextPassword);
//        newUser.setPassword(encryptedPassword);
//        newUser.setCreatedAt(LocalDate.now());
//        usersRepository.save(newUser);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUserById(@PathVariable long id) {
//        Optional<User> optionalUser = usersRepository.findById(id);
//        if (optionalUser.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
//        }
//        usersRepository.deleteById(id);
//    }
//
//    @PutMapping("/{id}")
//    public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
//        Optional<User> optionalUser = usersRepository.findById(id);
//        if (optionalUser.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
//        }
//        // get the user from the optional so we no longer have to deal with the optional
//        User originalUser = optionalUser.get();
//
//        // merge the changed data in updatedUser with originalUser
//        BeanUtils.copyProperties(updatedUser, originalUser, FieldHelper.getNullPropertyNames(updatedUser));
//
//        // originalUser now has the merged data (changes + original data)
//        originalUser.setId(id);
//
//        usersRepository.save(originalUser);
//    }
//
//    @PutMapping("/{id}/updatePassword")
//    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @RequestParam String newPassword) {
//        Optional<User> optionalUser = usersRepository.findById(id);
//        if (optionalUser.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
//        }
//
//        User user = optionalUser.get();
//
//        // compare old password with saved pw
//        if (!user.getPassword().equals(oldPassword)) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "amscray");
//        }
//
//        // validate new password
//        if (newPassword.length() < 3) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "new pw length must be at least 3 characters");
//        }
//
//        user.setPassword(newPassword);
//        usersRepository.save(user);
//    }
//}