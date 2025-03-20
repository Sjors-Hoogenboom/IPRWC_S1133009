package com.Sjors_Hoogenboom.IPRWC.controllers;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping
    public String getAdminPage() {
        return "Welcome, Admin!";
    }
}
