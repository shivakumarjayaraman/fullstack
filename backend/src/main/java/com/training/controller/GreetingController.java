package com.training.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greeting")
public class GreetingController {

    @GetMapping
    public String greeting() {
        return "Hello, World!";
    }

    @GetMapping("/{name}")
    public String greetingWithName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}
