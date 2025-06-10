package dev.chanwoo4267.coupangrecallservicebackend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.expiration.ms}")
    private long expirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 특정 클레임 추출
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 모든 클레임 추출
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }

    // 토큰에서 사용자 이메일 추출
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 토큰 만료일자 추출
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 토큰이 만료되었는지 확인
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 사용자 이메일을 기반으로 JWT 생성
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // 토큰의 주체로 email 설정
                .setIssuedAt(new Date(System.currentTimeMillis())) // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs)) // 만료 시간
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // 서명 알고리즘 및 비밀 키
                .compact();
    }

    // 토큰의 유효성 검증
    public Boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }
}