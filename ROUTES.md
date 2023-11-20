# Blogify API Routes

You can interact with the Blogify API routes locally by accessing `localhost:1337/docs`. Before exploring the routes, ensure that you have authenticated a user. Follow the steps below to authenticate a user in the Swagger Docs UI:

1. **Create a User:**

   - Use the `Create User` endpoint to register a new user. Provide the necessary information such as email, password, and name.

2. **Create a Session:**

   - After creating a user, use the `Create Session` endpoint to log in and obtain an access token. Copy the `accessToken` from the response.

3. **Authenticate User in Swagger Docs UI:**
   - Open `localhost:1337/docs` in your browser.
   - Locate the "Authorize" button in the Swagger Docs UI.
   - Paste the copied `accessToken` into the "Value" field and click "Authorize."

Now, you are authenticated, and you can explore and interact with the Blogify API routes in the Swagger Docs UI. Ensure to include the access token in the authorization header for endpoints that require authentication.

Feel free to test, create, update, and delete users and blogs using the provided routes, and enjoy a seamless experience with the Blogify API!

## Table of API endpoints

- [**User Routes**](#user)
- [_Create User_](#create-user)
- [Update User](#update-user)
- [_Create Session_](#create-session)
- [Get Sessions](#get-sessions)
- [Delete Session](#delete-session)

- [**Blog Routes**](#blogs)
- [Create Blog](#create-blog)
- [Get Blog](#get-blog)
- [Get All Blogs](#get-all-blogs)
- [Delete Blog](#delete-blog)
- [Update Blog](#update-blog)
- [Like Blog](#like-blog)
- [Unlike Blog](#unlike-blog)
- [Read Blog](#read-blog)

- [**Metrics Routes**](#metrics)
- [Get Metrics](#get-metrics)

## User

### Create User

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/users`  
**Request Body:**

```json
{
  "email": "{{email}}",
  "password": "{{password}}",
  "passwordConfirmation": "{{password}}",
  "name": "{{name}}"
}
```

### Update User

**Method:** PUT  
**Endpoint:** `{{endpoint}}/api/users`  
**Request Body:**

```json
{
  "email": "ikboljonme@gmail.com",
  "password": "1221qwwq",
  "passwordConfirmation": "1221qwwq",
  "name": "Ikboljon"
}
```

**Headers:**
`x-refresh: {{refreshToken}}`

### Create Session

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/sessions`  
**Request Body:**

```json
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```

### Get Sessions

**Method:** GET  
**Endpoint:** `{{endpoint}}/api/sessions`  
**Headers:**
`x-refresh: {{refreshToken}}`

### Delete Session

**Method:** DELETE  
**Endpoint:** `{{endpoint}}/api/sessions`  
**Headers:**
`x-refresh: {{refreshToken}}`

## Blogs

### Create Blog

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/blogs`  
**Request Body:**

```json
{
  "title": "Canon 1214444DSLR Camera with 18-55mm Lens",
  "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy-to-use automatic shooting modes, a large 24.1 MP sensor, Canon Camera Connect app integration, and built-in feature guide, EOS 1500D is always ready to go."
}
```

**Headers:**

`x-refresh: {{refreshToken}}`

### Get Blog

**Method:** GET  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}`  
**Headers:**

`x-refresh: {{refreshToken}}`

### Get All Blogs

**Method:** GET  
**Endpoint:** `{{endpoint}}/api/blogs`  
**Headers:**
`x-refresh: {{refreshToken}}`

### Delete Blog

**Method:** DELETE  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}`  
**Headers:**
`x-refresh: {{refreshToken}}`

### Update Blog

**Method:** PUT  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}`  
**Request Body:**

```json
{
  "title": "Updated",
  "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy-to-use automatic shooting modes, a large 24.1 MP sensor, Canon Camera Connect app integration, and built-in feature guide, EOS 1500D is always ready to go."
}
```

**Headers:**
`x-refresh: {{refreshToken}}`

### Like Blog

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}/like`  
**Headers:**

`x-refresh: {{refreshToken}}`

### Unlike Blog

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}/unlike`  
**Headers:**

`x-refresh: {{refreshToken}}`

### Read Blog

**Method:** POST  
**Endpoint:** `{{endpoint}}/api/blogs/{{blogId}}/read`  
**Headers:**

`x-refresh: {{refreshToken}}`

# Metrics

Explore the metrics route to gather essential information about the performance and status of the Blogify API.

## Get Metrics

### Request

- **Method:** GET
- **Endpoint:** `{{endpoint}}/api/metrics`

This endpoint allows you to retrieve various metrics related to the Blogify API's performance.

### Response

Upon a successful request, you can expect a response containing relevant metrics data. The details of the response will vary based on the current state and usage of the API.
