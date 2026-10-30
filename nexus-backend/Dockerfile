# ==========================================
# Stage 1: Build stage with Maven and Java 21
# ==========================================
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Copy project files into a temporary staging location.
# Supports building whether Docker build context is the repository root
# or the nexus-backend directory directly.
COPY . /tmp/build-context/

# Normalise project source files into /build regardless of context
RUN if [ -f /tmp/build-context/nexus-backend/pom.xml ]; then \
        echo "Detected repository root context. Copying from nexus-backend/..."; \
        cp -a /tmp/build-context/nexus-backend/. /build/; \
    else \
        echo "Detected backend directory context. Copying source files..."; \
        cp -a /tmp/build-context/. /build/; \
    fi && \
    rm -rf /tmp/build-context

# Download dependencies for layer caching
RUN mvn dependency:go-offline -B || true

# Package the application (skip tests in container build)
RUN mvn clean package -DskipTests -B && \
    cp target/nexus-backend-*.jar target/app.jar

# ==========================================
# Stage 2: Minimal runtime with JRE 21
# ==========================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root system group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create the uploads directory for local file attachments and assign ownership
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app

# Copy the executable Spring Boot JAR from builder stage
COPY --from=builder --chown=appuser:appgroup /build/target/app.jar /app/app.jar

# Switch to non-root user
USER appuser

# Expose default port (Render overrides PORT environment variable at runtime)
EXPOSE 8080

# Configure container-aware JVM memory settings
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]

