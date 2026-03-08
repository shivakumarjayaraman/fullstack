# Training Backend - Spring Boot Application

This is the backend application for the Full Stack Development Training Course.

## Prerequisites

- Java JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+ (for production)
- H2 Database (for testing - included)

## Setup Instructions

### 1. Database Setup

#### MySQL (Production/Development)
```sql
CREATE DATABASE training_db;
CREATE DATABASE training_dev;
```

Or update `application.properties` to use `createDatabaseIfNotExist=true` (already configured).

#### Update Database Credentials
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Build and Run

#### Using Maven
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

#### Using IDE
- Import as Maven project
- Run `TrainingApplication.java`

### 3. Activate Profiles

#### Development Profile
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

#### Test Profile (uses H2)
```bash
mvn test -Dspring.profiles.active=test
```

## API Endpoints

### Hello Endpoints
- `GET /api/hello` - Simple greeting
- `GET /api/hello/{name}` - Personalized greeting

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Testing

### Run All Tests
```bash
mvn test
```

### Run Tests with Test Profile
```bash
mvn test -Dspring.profiles.active=test
```

## Project Structure

```
src/
├── main/
│   ├── java/com/training/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── model/          # Entity classes
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── config/         # Configuration classes
│   │   ├── exception/      # Exception handling
│   │   └── TrainingApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       └── application-test.properties
└── test/
    └── java/com/training/  # Test classes
```

## Actuator Endpoints

- Health: `http://localhost:8080/api/actuator/health`
- Info: `http://localhost:8080/api/actuator/info`
- Metrics: `http://localhost:8080/api/actuator/metrics`

## Development Tips

1. **Hot Reload:** Use Spring Boot DevTools (add to dependencies if needed)
2. **Database Console:** H2 console available at `/h2-console` in test profile
3. **Logging:** Check `application.properties` for logging configuration
4. **CORS:** Configured for `http://localhost:3000` and `http://localhost:5173`

## Next Steps

- Session 2: Spring Boot Fundamentals
- Session 3: RESTful API Design
- Session 4: Spring Data JPA and Database Integration
