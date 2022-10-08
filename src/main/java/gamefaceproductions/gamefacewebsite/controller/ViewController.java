package gamefaceproductions.gamefacewebsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ViewController {

    @GetMapping(value="doLogin")
    public RedirectView oauthRedirect(RedirectAttributes attributes) {
        //http://localhost:8081/dologin#state=pass-through%20value&access_token=ya29.a0Aa4xrXPfpUa2mRv4JXSP6f8qHeVeA4fJN41O77KarS6SpLzLUstb5sKm4cJXuWBmY4eVDmqqwvX2xybM6NGan_mYHkv3cF8llpZpDnlXEJrW6k29fEWXvNbvZmWAYJd84bn-OvHblwoyU79YcApK_7dCjfjNhAaCgYKATASAQ4SFQEjDvL9ZmxxCFXg3pfZxnllIPqp8w0165&token_type=Bearer&expires_in=3599&scope=email%20profile%20openid%20https://www.googleapis.com/auth/classroom.rosters.readonly%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/classroom.student-submissions.students.readonly%20https://www.googleapis.com/auth/classroom.courses.readonly%20https://www.googleapis.com/auth/drive.metadata.readonly%20https://www.googleapis.com/auth/userinfo.email&authuser=1&hd=codeup.com&prompt=none
        System.out.println("oauthRedirect called");
//        return "forward:/index.html";
        return new RedirectView("index.html");
    }
    @RequestMapping({"/", "/about","/account", "logout", "/login", "/home", "/posts", "/register", "/me", "/searchusers"})
    public String showView() {
        return "forward:/index.html";
    }
}
