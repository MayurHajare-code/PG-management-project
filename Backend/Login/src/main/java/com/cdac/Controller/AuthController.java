package com.cdac.Controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cdac.model.User;
import com.cdac.repository.UserRepository;
import com.cdac.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


@RestController
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			return ResponseEntity.badRequest().body("Email already exists");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRegisterDate(LocalDateTime.now());

		if (user.getRole() == null) {
			user.setRole("ROLE_USER"); // default
		}

		userRepository.save(user);
		return ResponseEntity.ok("User registered successfully");
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return ResponseEntity.ok("Logged out successfully");
	}

	@GetMapping("/home")
	public Map<String, String> home(Principal principal) {
		User user = userRepository.findByEmail(principal.getName())
				.orElseThrow(() -> new RuntimeException("User not found"));

		Map<String, String> response = new HashMap<>();
		response.put("email", user.getEmail());
		response.put("role", user.getRole());
		response.put("name", user.getName());
		response.put("phone", user.getPhone());
		response.put("date", user.getRegisterDate().toString());
//		response.put("role", "ROLE_" + user.getRole());
		System.out.println("role  "+ user.getRole());
		return response;
	}

	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody User updatedUser, Principal principal) {
	    User user = userRepository.findByEmail(principal.getName())
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    user.setName(updatedUser.getName());
	    user.setPhone(updatedUser.getPhone());

	    userRepository.save(user);
	    return ResponseEntity.ok("Profile updated successfully");
	}
}