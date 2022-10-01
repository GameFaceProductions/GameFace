package gamefaceproductions.gamefacewebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    @RequestMapping({"/", "/about", "/login", "/home", "/posts", "/register", "/me"})
    public String showView() {
        return "forward:/index.html";
    }
}
