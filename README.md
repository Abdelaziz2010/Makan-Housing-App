

# 🏠 Makan - Property Listing Platform Backend API

[![.NET](https://img.shields.io/badge/.NET-6.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2019+-CC2927?logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![Entity Framework](https://img.shields.io/badge/Entity_Framework_Core-6.0-6DB33F?logo=ef&logoColor=white)](https://docs.microsoft.com/ef/)
[![Postman](https://img.shields.io/badge/Postman-API-orange?logo=postman)](https://www.postman.com/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?logo=swagger)](https://swagger.io/)
[![AutoMapper](https://img.shields.io/badge/AutoMapper-9.0-FF6F00?logo=automapper&logoColor=white)](https://automapper.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)


---


## Project Overview:

**Objective:** 

Makan is a property listing platform designed to simplify your search for homes for rent or sale. Featuring advanced search tools, detailed property listings, Makan seamlessly connects renters, buyers, sellers, and real estate agents.



**Makan is a platform for:**
- **Renters & Buyers**: To find and compare properties
- **Sellers & Landlords**: To list and manage properties
- **Real Estate Agents**: To connect with potential clients

---

# Project Mind Map:



### Glimpse of the working solution:

![Image](https://github.com/user-attachments/assets/a6588df3-5a6e-4ad0-9bc5-de60f9d876b2)

![Image](https://github.com/user-attachments/assets/d8de076a-adfc-4dd2-8843-d66ab82d368a)

![Image](https://github.com/user-attachments/assets/9796da87-c818-4a00-8913-7edf5fe163ff)

![Image](https://github.com/user-attachments/assets/491a8d89-a9d2-4a33-b2c9-2895feeef76b)


---

## 🚀 Key Features

### 🏡 Core Functionality
- **Property Listings** for rent and sale
- **Advanced Property Search** with filters (location, price, type, etc.)
- **Detailed Property Information** (photos, features, amenities)
- **User Account Management** (registration, login, JWT authentication)
- **Contact Forms** for property inquiries
- **Cloud Storage** uses Cloudinary for uploading, storing images.

### ⚡ Performance & Security
- **JWT Authentication** for secure API access
- **CORS Support** for frontend-backend integration
- **Repository Pattern & Unit of Work** for clean, maintainable data access
- **Global Exception Handling** for robust error management


### 🌟 Additional Features
- **AutoMapper** for efficient object mapping
- **Swagger** for interactive API documentation
- **Entity Framework Core** with SQL Server for data persistence
- **Demo Data Seeding** for development/testing

---

## 🛠️ Technology Stack

| Category          | Technologies/Libraries                |
|-------------------|---------------------------------------|
| Backend           | .NET 6 & ASP.NET Core Web API         |
| ORM               | Entity Framework Core                 |
| Database          | SQL Server                            |
| Frontend          | Angular, Bootstrap                    |
| Authentication    | JWT                                   |
| Mapping           | AutoMapper                            |
| Development Tools | Swagger/OpenAPI, Postman, Git, VS     |


---


## 📚 API Documentation

### 👤 Account Controller

| Method | Endpoint                   | Description                          |
|--------|----------------------------|--------------------------------------|
| POST   | `/api/Account/login`       | Authenticate user and return JWT     |
| POST   | `/api/Account/register`    | Register a new user account          |


### 🏙️ City Controller

| Method | Endpoint                           | Description                          |
|--------|------------------------------------|--------------------------------------|
| GET    | `/api/City`                        | Get list of all cities               |
| POST   | `/api/City/add`                    | Add a new city                       |
| PUT    | `/api/City/update/{id}`            | Fully update city details            |
| PATCH  | `/api/City/update/{id}`            | Partially update city details        |
| PUT    | `/api/City/updateCityName/{id}`    | Update only the city name            |
| DELETE | `/api/City/delete/{id}`            | Delete a city                        |


### 🛋️ FurnishingType Controller

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/FurnishingType/list`  | Get all furnishing types             |


### 🏠 Property Controller

| Method | Endpoint                                                   | Description                             |
|--------|------------------------------------------------------------|-----------------------------------------|
| GET    | `/api/Property/list/{sellRent}`                            | List properties by type (1-sale/2-rent) |
| GET    | `/api/Property/detail/{id}`                                | Get detailed property information       |
| POST   | `/api/Property/add`                                        | Add a new property                      |
| POST   | `/api/Property/add/photo/{propId}`                         | Add photo to property                   |
| POST   | `/api/Property/set-primary-photo/{propId}/{photoPublicId}` | Set property's primary photo            |
| DELETE | `/api/Property/delete-photo/{propId}/{photoPublicId}`      | Delete property photo                   |


### 🏷️ PropertyType Controller

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/PropertyType/list`    | Get all property types               |


---


## 🔧 Development Focus

### Repository Pattern

- **Description**: Abstracts data access logic for maintainability and testability
- **Unit of Work**: Ensures transactional integrity across repositories

### Entity Framework Core
- **Description**: Handles database interactions and migrations
- **Features**: Code-first migrations, entity mapping

### Authentication
- **JWT Authentication**: Secure user login and protected endpoints

## 🚧 Under Construction

- **Role-Based Authorization**: Fine-grained access for agents, landlords, and users
- **Unit Testing**: Automated tests for API endpoints


---


## 📝 Request/Response Examples

### Sample Property Creation Request:
```http
POST /api/Properties
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
{
  "name": "White House Demo",
  "propertyTypeId": 1,
  "bhk": 2,
  "furnishingTypeId": 1,
  "price": 1800,
  "builtArea": 1400,
  "carpetArea": 900,
  "address": "6 Street",
  "address2": "Golf Course Road",
  "cityId": 1,
  "floorNo": 3,
  "totalFloors": 3,
  "readyToMove": true,
  "mainEntrance": "East",
  "gated": true,
  "maintenance": 300,
  "estPossessionOn": "2019-01-01",
  "description": "Well Maintained builder floor available for rent at prime location."
}
```

### Sample Property Listing Response:

```http
Response:
{
  "statusCode": 200,
  "message": "Property created successfully"
}
```


---

## 🚀 Getting Started
1. Clone the repository
2. Configure database connection in `appsettings.json`
3. Run migrations: `dotnet ef database update`
4. Start the API: `dotnet run`

---

## Links
- **Project Repository: https://github.com/Abdelaziz2010/Makan-Housing-App**

- **Frontend demo: https://housing-angular-pro.firebaseapp.com/**