package com.example.authenticationservice;

import com.example.authenticationservice.model.User;
import com.example.authenticationservice.repository.UserRepository;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRegisterUser() {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(user)
        .when()
                .post("/register")
        .then()
                .statusCode(200)
                .body("id", notNullValue())
                .body("username", equalTo("testuser"));
    }
}
