//package gamefaceproductions.gamefacewebsite.security;
//
//import docrob.venusrestblog.data.User;
//import docrob.venusrestblog.dto.UpdateUserDto;
//import docrob.venusrestblog.repository.UsersRepository;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Arrays;
//
//@Service
//public class UserService implements UserDetailsService {
//
//    private final UsersRepository userRepository;
//
//    public UserService(UsersRepository repository) {
//        this.userRepository = repository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
//        User user = userRepository.findByUserName(userName);
//        if (user == null) {
//            throw new RuntimeException("User not found: " + userName);
//        }
//        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
//        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), Arrays.asList(authority));
//    }
//
//    public void updateUser(UpdateUserDto updateUserDto) {
//        User user = userRepository.findById(updateUserDto.getId()).orElseThrow();
//
//        if (updateUserDto.getUsername() != null && !updateUserDto.getUsername().isEmpty()) {
//            user.setUserName(updateUserDto.getUsername());
//        }
//        if (updateUserDto.getEmail() != null && !updateUserDto.getEmail().isEmpty()) {
//            user.setEmail(updateUserDto.getEmail());
//        }
//        userRepository.save(user);
//    }
//}
