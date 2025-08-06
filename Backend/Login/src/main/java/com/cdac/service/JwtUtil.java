//package com.cdac.service;
//
//import java.util.Date;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//@Component
//public class JwtUtil {
////	@Value("${jwt.secret}")
////    private String secret;
//	
//	private String secret = "mySecretKey123";
//
//
//    public String generateToken(String username) {
//    	System.out.println("Generating token for: " + username);
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
//                .signWith(SignatureAlgorithm.HS256, secret)
//                .compact();
//    }
//
//    public String extractUsername(String token) {
//        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token)
//                .getBody().getSubject();
//    }
//
//    public boolean validateToken(String token, UserDetails userDetails) {
//        return extractUsername(token).equals(userDetails.getUsername());
//    }
//}
