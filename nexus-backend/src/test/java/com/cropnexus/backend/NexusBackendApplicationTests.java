package com.cropnexus.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
class NexusBackendApplicationTests {

    @Test
    void contextLoads() {
        // Context load test - verifies Spring context starts correctly
    }
}
