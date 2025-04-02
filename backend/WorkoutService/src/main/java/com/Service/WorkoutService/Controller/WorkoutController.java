package WorkoutService.src.main.java.com.Service.WorkoutService.Controller;
    

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class WorkoutController {

    @GetMapping("/helloWorld")
    public String helloWorld() {
        return "Hello world from Service A!";
    } 

}
