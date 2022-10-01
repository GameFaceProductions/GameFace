package gamefaceproductions.gamefacewebsite.controller;

import org.springframework.web.bind.annotation.*;

@RestController
// in tbe below annotation ", headers = "Accept=application/json" "
// is what makes this controller return JSON by default
// leaving it out will return text/html
// don't know what to set consumes =
// produces = application/json will output json as response
@RequestMapping(value = "/", produces = "application/json")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        // returns and is interpreted as HTML
        return new String("<h1>Hello world</h1>");
    }

    @GetMapping("/hello/{name}")
    public String hello(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
