package com.training.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

    public HelloController() {
        System.out.println("Loading HelloController");
    }
    
    @GetMapping
    public String hello() {
        return "Hello, Spring Boot!";
    }
    
    @GetMapping("/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
