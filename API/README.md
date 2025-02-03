## 🛠 API Endpoints

### 📋 Article Endpoints

#### Retrieve Articles
- **GET /api/Article**
  - Fetch all articles
  - Returns a list of articles

- **GET /api/Article/get/{id}**
  - Retrieve a specific article by ID
  - Returns detailed article information

- **GET /api/Article/paginated**
  - Paginated article search
  - Query Parameters:
    - `searchTerm`: Filter articles
    - `pageNumber`: Page number (default: 1)
    - `pageSize`: Number of items per page (default: 5)

#### Manage Articles
- **POST /api/Article/create**
  - Create a new article

- **PUT /api/Article/update/{id}**
  - Update an existing article

- **DELETE /api/Article/delete/{id}**
  - Delete an article by ID

## Running the Project
### In Visual Studio 2022
1. Open the solution
2. Press F5 or click the "Start" button (green play button)
3. Project will build and launch in default browser
