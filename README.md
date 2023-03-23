## Description

- A rest api for a content management that does the following

- **Posts**
    - Create posts
    - Delete posts
    - Edit posts
    - List posts
- **Categories**
    - Create a post category
    - List all post categories
    - Edit a post category
    - Delete a post category
- **Users**
    - Create a user
    - List all users
    - Delete a user Bearer Token authentication
    - Edit a single user's profile information


## Installation

# install package 
-- npm install


## Setup .env Variables
- NODE_ENV=development
- JWT_KEY_SECRET=

- JWT_SECRET=
- EXPIRESIN=
- DATABASE_HOST=
- USERNAME=
- PASSWORD=
- DATABASE=

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run stat:dev

```

## Running the app

```bash

$ npm run build

```

```bash
## Endpoints 

# REGISTER A USER
- URL: /api/v1/user/register
- METHOD: POST 
- REQUIRED : NO
- PAYLOAD SAMPLE: {
  "name": "unknow soft",
  "emailAddress": "unkown@gmail.com",
  "password": "*******"
}
- RESPONSE SAMPLE: {
  "success": true,
  "message": "user registered"
}

# USER LOGIN
- URL: /api/v1/user/login
- METHOD: POST 
- REQUIRED TOKEN: NO
- PAYLOAD SAMPLE: {
  "emailAddress": "unkown@gmail.com",
  "password": "*******"
}
- RESPONSE SAMPLE: {
  "emailAddress": "soft@gmail.com",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJzb2Z0QGdtYWlsLmNvbSIsInVzZXJfdXVpZCI6ImMyYzRkZDJiLTFkNmUtNGJiZC1iYzI1LTY5MzQ4YjViNmFiNyIsImlhdCI6MTY3OTUxMTgzM30.N5vGB67t_B-In10Cm9q8G9fKFE9qStTLIxHK2TidsOk"
}

# EDIT USER
- URL: /api/v1/user/:user_uuid
- METHOD: PATCH 
- REQUIRED TOKEN: YES
- PAYLOAD SAMPLE:{
   "name": "demo World",
  "emailAddress": "demo@gmail.com"
}

- RESPONSE SAMPLE:{
  "success": true,
  "message": "user detail edited"
}

# DELETE A User
- URL: /api/v1/user/:user_uuid
- METHOD: DELETE 
- REQUIRED TOKEN: YES
- RESPONSE SAMPLE: {
  "success": true,
  "message": "User Deleted"
}

# GET ALL USERS
- URL: /api/v1/user/all
- METHOD: GET
- REQUIRED AUTH TOKEN HEADER: NO
- SAMPLE RESPONSE: {
  "success": true,
  "message": "All Users",
  "users": [
    {
      "user_uuid": "08dbeb24-3c43-407f-9e8b-71223a18453b",
      "name": "demo World",
      "emailAddress": "demo@gmail.com"
    },
    {
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "name": "delete soft",
      "emailAddress": "soft@gmail.com"
    },
    {
      "user_uuid": "1986c78b-a98f-403a-b13a-ad8f3ed8b867",
      "name": "unknow soft",
      "emailAddress": "unkown@gmail.com"
    }
  ]
}



# ADD A NEW CATEGORY
- URL: /api/v1/category/new
- METHOD: POST 
- REQUIRED TOKEN: YES
- PAYLOAD SAMPLE: {
  "name": "Delete Edit ",
  "description": "Somthing we are trying to delete"
}
- RESPONSE SAMPLE: {
  "success": true,
  "message": "New Category Created"
}


# GET ALL CATEGORIES
- URL: /api/v1/category/all
- METHOD: GET
- REQUIRED AUTH TOKEN HEADER: NO
- SAMPLE RESPONSE: {
  "success": true,
  "message": "All Category",
  "categories": [
    {
      "id": 1,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "name": "Digital Coin",
      "description": "Digital decentralize currency"
    },
    {
      "id": 2,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "name": "AliExpress",
      "description": "Online commerce for young Genz"
    },
    {
      "id": 4,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "name": "Edit Completed",
      "description": "Somthing we are trying to delete"
    }
  ]
}

# EDIT A CATEGORY
- URL: /api/v1/category/:id
- METHOD: PATCH 
- REQUIRED TOKEN: YES
- PAYLOAD SAMPLE:{
  "name": "Edit Completed"
}
- RESPONSE SAMPLE: {
  "success": true,
  "message": "Category details edited"
}

# DELETE A CATEGORY
- URL: /api/v1/category/:id
- METHOD: DELETE 
- REQUIRED TOKEN: YES
- RESPONSE SAMPLE: {
  "success": true,
  "message": "Category Deleted"
}

# ADD A NEW POST
- URL: /api/v1/post/new
- METHOD: POST 
- REQUIRED TOKEN: YES
- PAYLOAD SAMPLE: {
  "categoryId": 4,
  "title": "Delete Delete ",
  "content": "You Total 5 (delta 4), reused 0 (delta 0), pack-reused 0remote: Resolving deltas: 100% (4/4), completed with 4 local objects  "
}
- RESPONSE SAMPLE: {
  "success": true,
  "message": "New Post Added"
}

# EDIT A POST
- URL: /api/v1/post/:id
- METHOD: PATCH 
- REQUIRED TOKEN: YES
- PAYLOAD SAMPLE:{
  "name": "Edit Post"
}
- RESPONSE SAMPLE: {
  "success": true,
  "message": "Post details edited"
}

# DELETE A POST
- URL: /api/v1/post/:id
- METHOD: DELETE 
- REQUIRED TOKEN: YES
- RESPONSE SAMPLE: {
  "success": true,
  "message": "Post Deleted"
}

# GET ALL POSTS
- URL: /api/v1/post/all
- METHOD: GET
- REQUIRED AUTH TOKEN HEADER: NO
- SAMPLE RESPONSE: {
  "success": true,
  "message": "All Posts",
  "posts": [
    {
      "id": 1,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "categoryId": 4,
      "title": "Design API with Data efficiency in mind",
      "content": "you believe will best showcase your experience and differentiate yourself from other, you believe will best showcase your experience and differentiate yourself from oth"
    },
    {
      "id": 2,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "categoryId": 4,
      "title": "Edit Edit Edit ",
      "content": "you Delete edit delete edit delete edit berience and differentiate yourself from oth"
    },
    {
      "id": 4,
      "user_uuid": "c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7",
      "categoryId": 4,
      "title": "Edit Demo",
      "content": "esolving deltas: 100% (4/4), completed with 4 local objects  "
    }
  ]
}

```