# API Endpoints Documentation

This document contains all the API endpoints for the Hackathon Feedback Tool and sample JSON payloads for testing.

## Hackathon Module

### 1. Create a Hackathon

**Endpoint:** `POST /hackathon`

**Sample Request:**
```json
{
  "name": "Code for Change 2024",
  "description": "A 48-hour hackathon to build solutions for social good",
  "startDate": "2024-11-15T09:00:00.000Z",
  "endDate": "2024-11-17T17:00:00.000Z",
  "location": "Innovation Hub, University Campus",
  "urlSlug": "code-for-change-2024"
}
```

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Code for Change 2024",
  "description": "A 48-hour hackathon to build solutions for social good",
  "startDate": "2024-11-15T09:00:00.000Z",
  "endDate": "2024-11-17T17:00:00.000Z",
  "location": "Innovation Hub, University Campus",
  "urlSlug": "code-for-change-2024",
  "createdAt": "2024-08-05T12:34:56.789Z",
  "updatedAt": "2024-08-05T12:34:56.789Z"
}
```

### 2. Get All Hackathons

**Endpoint:** `GET /hackathon`

**Sample Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Code for Change 2024",
    "description": "A 48-hour hackathon to build solutions for social good",
    "startDate": "2024-11-15T09:00:00.000Z",
    "endDate": "2024-11-17T17:00:00.000Z",
    "location": "Innovation Hub, University Campus",
    "urlSlug": "code-for-change-2024",
    "createdAt": "2024-08-05T12:34:56.789Z",
    "updatedAt": "2024-08-05T12:34:56.789Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "AI Hackathon 2024",
    "description": "Building next-gen AI applications",
    "startDate": "2024-09-20T09:00:00.000Z",
    "endDate": "2024-09-22T17:00:00.000Z",
    "location": "Tech Campus, Downtown",
    "urlSlug": "ai-hackathon-2024",
    "createdAt": "2024-08-01T10:24:36.123Z",
    "updatedAt": "2024-08-01T10:24:36.123Z"
  }
]
```

### 3. Get Hackathon by ID

**Endpoint:** `GET /hackathon/:id`

**Sample URL:** `GET /hackathon/550e8400-e29b-41d4-a716-446655440000`

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Code for Change 2024",
  "description": "A 48-hour hackathon to build solutions for social good",
  "startDate": "2024-11-15T09:00:00.000Z",
  "endDate": "2024-11-17T17:00:00.000Z",
  "location": "Innovation Hub, University Campus",
  "urlSlug": "code-for-change-2024",
  "createdAt": "2024-08-05T12:34:56.789Z",
  "updatedAt": "2024-08-05T12:34:56.789Z",
  "participants": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
      "participantId": "550e8400-e29b-41d4-a716-446655440100",
      "createdAt": "2024-08-06T14:23:45.678Z",
      "updatedAt": "2024-08-06T14:23:45.678Z",
      "participant": {
        "id": "550e8400-e29b-41d4-a716-446655440100",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@example.com",
        "school": "Tech University",
        "major": "Computer Science",
        "year": "3rd",
        "createdAt": "2024-08-06T14:20:45.678Z",
        "updatedAt": "2024-08-06T14:20:45.678Z"
      }
    }
  ],
  "feedback": []
}
```

### 4. Get Hackathon by URL Slug

**Endpoint:** `GET /hackathon/slug/:slug`

**Sample URL:** `GET /hackathon/slug/code-for-change-2024`

**Sample Response:** 
*(Same structure as the response for Get Hackathon by ID)*

### 5. Update a Hackathon

**Endpoint:** `PATCH /hackathon/:id`

**Sample URL:** `PATCH /hackathon/550e8400-e29b-41d4-a716-446655440000`

**Sample Request:**
```json
{
  "name": "Code for Change 2024 - Updated",
  "location": "New Innovation Hub, Main Campus"
}
```

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Code for Change 2024 - Updated",
  "description": "A 48-hour hackathon to build solutions for social good",
  "startDate": "2024-11-15T09:00:00.000Z",
  "endDate": "2024-11-17T17:00:00.000Z",
  "location": "New Innovation Hub, Main Campus",
  "urlSlug": "code-for-change-2024",
  "createdAt": "2024-08-05T12:34:56.789Z",
  "updatedAt": "2024-08-07T09:15:26.321Z"
}
```

### 6. Delete a Hackathon

**Endpoint:** `DELETE /hackathon/:id`

**Sample URL:** `DELETE /hackathon/550e8400-e29b-41d4-a716-446655440000`

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Code for Change 2024 - Updated",
  "description": "A 48-hour hackathon to build solutions for social good",
  "startDate": "2024-11-15T09:00:00.000Z",
  "endDate": "2024-11-17T17:00:00.000Z",
  "location": "New Innovation Hub, Main Campus",
  "urlSlug": "code-for-change-2024",
  "createdAt": "2024-08-05T12:34:56.789Z",
  "updatedAt": "2024-08-07T09:15:26.321Z"
}
```

### 7. Get Hackathon Participants

**Endpoint:** `GET /hackathon/:id/participants`

**Sample URL:** `GET /hackathon/550e8400-e29b-41d4-a716-446655440000/participants`

**Sample Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440100",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "school": "Tech University",
    "major": "Computer Science",
    "year": "3rd",
    "createdAt": "2024-08-06T14:20:45.678Z",
    "updatedAt": "2024-08-06T14:20:45.678Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440101",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "school": "Engineering College",
    "major": "Software Engineering",
    "year": "2nd",
    "createdAt": "2024-08-06T15:10:22.456Z",
    "updatedAt": "2024-08-06T15:10:22.456Z"
  }
]
```

### 8. Add Participant to Hackathon

**Endpoint:** `POST /hackathon/:id/participants`

**Sample URL:** `POST /hackathon/550e8400-e29b-41d4-a716-446655440000/participants`

**Sample Request:**
```json
{
  "participantId": "550e8400-e29b-41d4-a716-446655440102"
}
```

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440012",
  "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
  "participantId": "550e8400-e29b-41d4-a716-446655440102",
  "createdAt": "2024-08-07T11:30:15.789Z",
  "updatedAt": "2024-08-07T11:30:15.789Z",
  "participant": {
    "id": "550e8400-e29b-41d4-a716-446655440102",
    "firstName": "Emily",
    "lastName": "Johnson",
    "email": "emily.johnson@example.com",
    "school": "Design Academy",
    "major": "UI/UX Design",
    "year": "4th",
    "createdAt": "2024-08-07T10:45:33.123Z",
    "updatedAt": "2024-08-07T10:45:33.123Z"
  },
  "hackathon": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Code for Change 2024 - Updated",
    "description": "A 48-hour hackathon to build solutions for social good",
    "startDate": "2024-11-15T09:00:00.000Z",
    "endDate": "2024-11-17T17:00:00.000Z",
    "location": "New Innovation Hub, Main Campus",
    "urlSlug": "code-for-change-2024",
    "createdAt": "2024-08-05T12:34:56.789Z",
    "updatedAt": "2024-08-07T09:15:26.321Z"
  }
}
```

### 9. Remove Participant from Hackathon

**Endpoint:** `DELETE /hackathon/:id/participants/:participantId`

**Sample URL:** `DELETE /hackathon/550e8400-e29b-41d4-a716-446655440000/participants/550e8400-e29b-41d4-a716-446655440102`

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440012",
  "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
  "participantId": "550e8400-e29b-41d4-a716-446655440102",
  "createdAt": "2024-08-07T11:30:15.789Z",
  "updatedAt": "2024-08-07T11:30:15.789Z"
}
```

## Feedback Module

### 1. Create Feedback

**Endpoint:** `POST /feedback`

**Sample Request:**
```json
{
  "rating": 4,
  "comments": "Great hackathon! Learned a lot and met amazing people.",
  "suggestions": "More food options would be nice for next time.",
  "participantId": "550e8400-e29b-41d4-a716-446655440100",
  "hackathonId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Sample Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655441000",
  "rating": 4,
  "comments": "Great hackathon! Learned a lot and met amazing people.",
  "suggestions": "More food options would be nice for next time.",
  "participantId": "550e8400-e29b-41d4-a716-446655440100",
  "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-08-18T14:25:36.789Z",
  "updatedAt": "2024-08-18T14:25:36.789Z"
}
```

### 2. Get All Feedback

**Endpoint:** `GET /feedback`

**Sample Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655441000",
    "rating": 4,
    "comments": "Great hackathon! Learned a lot and met amazing people.",
    "suggestions": "More food options would be nice for next time.",
    "participantId": "550e8400-e29b-41d4-a716-446655440100",
    "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-08-18T14:25:36.789Z",
    "updatedAt": "2024-08-18T14:25:36.789Z",
    "participant": {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "school": "Tech University",
      "major": "Computer Science",
      "year": "3rd",
      "createdAt": "2024-08-06T14:20:45.678Z",
      "updatedAt": "2024-08-06T14:20:45.678Z"
    },
    "hackathon": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Code for Change 2024 - Updated",
      "description": "A 48-hour hackathon to build solutions for social good",
      "startDate": "2024-11-15T09:00:00.000Z",
      "endDate": "2024-11-17T17:00:00.000Z",
      "location": "New Innovation Hub, Main Campus",
      "urlSlug": "code-for-change-2024",
      "createdAt": "2024-08-05T12:34:56.789Z",
      "updatedAt": "2024-08-07T09:15:26.321Z"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655441001",
    "rating": 5,
    "comments": "Fantastic experience, would definitely participate again!",
    "suggestions": null,
    "participantId": "550e8400-e29b-41d4-a716-446655440101",
    "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-08-18T15:10:22.456Z",
    "updatedAt": "2024-08-18T15:10:22.456Z",
    "participant": {
      "id": "550e8400-e29b-41d4-a716-446655440101",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "school": "Engineering College",
      "major": "Software Engineering",
      "year": "2nd",
      "createdAt": "2024-08-06T15:10:22.456Z",
      "updatedAt": "2024-08-06T15:10:22.456Z"
    },
    "hackathon": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Code for Change 2024 - Updated",
      "description": "A 48-hour hackathon to build solutions for social good",
      "startDate": "2024-11-15T09:00:00.000Z",
      "endDate": "2024-11-17T17:00:00.000Z",
      "location": "New Innovation Hub, Main Campus",
      "urlSlug": "code-for-change-2024",
      "createdAt": "2024-08-05T12:34:56.789Z",
      "updatedAt": "2024-08-07T09:15:26.321Z"
    }
  }
]
```

### 3. Get Feedback by Query Parameters

**Endpoint:** `GET /feedback?hackathonId=:hackathonId` or `GET /feedback?participantId=:participantId`

**Sample URL:** `GET /feedback?hackathonId=550e8400-e29b-41d4-a716-446655440000`

**Sample Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655441000",
    "rating": 4,
    "comments": "Great hackathon! Learned a lot and met amazing people.",
    "suggestions": "More food options would be nice for next time.",
    "participantId": "550e8400-e29b-41d4-a716-446655440100",
    "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-08-18T14:25:36.789Z",
    "updatedAt": "2024-08-18T14:25:36.789Z",
    "participant": {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "school": "Tech University",
      "major": "Computer Science",
      "year": "3rd",
      "createdAt": "2024-08-06T14:20:45.678Z",
      "updatedAt": "2024-08-06T14:20:45.678Z"
    }
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655441001",
    "rating": 5,
    "comments": "Fantastic experience, would definitely participate again!",
    "suggestions": null,
    "participantId": "550e8400-e29b-41d4-a716-446655440101",
    "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-08-18T15:10:22.456Z",
    "updatedAt": "2024-08-18T15:10:22.456Z",
    "participant": {
      "id": "550e8400-e29b-41d4-a716-446655440101",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "school": "Engineering College",
      "major": "Software Engineering",
      "year": "2nd",
      "createdAt": "2024-08-06T15:10:22.456Z",
      "updatedAt": "2024-08-06T15:10:22.456Z"
    }
  }
]
```

### 4. Get Feedback by Hackathon ID

**Endpoint:** `GET /feedback/hackathon/:id`

**Sample URL:** `GET /feedback/hackathon/550e8400-e29b-41d4-a716-446655440000`

**Sample Response:**
*(Same structure as the response for Get Feedback by Query Parameters with hackathonId)*

### 5. Get Feedback by Participant ID

**Endpoint:** `GET /feedback/participant/:id`

**Sample URL:** `GET /feedback/participant/550e8400-e29b-41d4-a716-446655440100`

**Sample Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655441000",
    "rating": 4,
    "comments": "Great hackathon! Learned a lot and met amazing people.",
    "suggestions": "More food options would be nice for next time.",
    "participantId": "550e8400-e29b-41d4-a716-446655440100",
    "hackathonId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-08-18T14:25:36.789Z",
    "updatedAt": "2024-08-18T14:25:36.789Z",
    "hackathon": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Code for Change 2024 - Updated",
      "description": "A 48-hour hackathon to build solutions for social good",
      "startDate": "2024-11-15T09:00:00.000Z",
      "endDate": "2024-11-17T17:00:00.000Z",
      "location": "New Innovation Hub, Main Campus",
      "urlSlug": "code-for-change-2024",
      "createdAt": "2024-08-05T12:34:56.789Z",
      "updatedAt": "2024-08-07T09:15:26.321Z"
    }
  }
]
```

## Participant Creation (for Testing)

Although not explicitly requested, you'll need participant records to test the hackathon and feedback endpoints.

**Endpoint:** Create a custom endpoint or use database seeding.

**Sample Participant JSON:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "school": "Tech University",
  "major": "Computer Science",
  "year": "3rd"
}
``` 