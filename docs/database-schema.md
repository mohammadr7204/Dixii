# Database Schema Documentation

## Collections

### Users Collection
```typescript
/users/{userId}
{
  uid: string;              // Firebase Auth UID
  email: string;            // User's email
  displayName: string;      // User's display name
  photoURL?: string;        // User's profile photo URL
  createdAt: timestamp;     // Account creation timestamp
  updatedAt: timestamp;     // Last update timestamp
  settings: {
    defaultCategory?: string;  // Default document category
    defaultTags?: string[];    // Default document tags
    theme?: 'light' | 'dark';  // UI theme preference
  }
}
```

### Documents Collection
```typescript
/documents/{documentId}
{
  id: string;              // Document ID
  userId: string;          // Owner's user ID
  clientId?: string;       // Associated client ID (optional)
  name: string;            // Document name
  type: string;            // MIME type
  size: number;            // File size in bytes
  category: string;        // Document category
  tags: string[];          // Document tags
  downloadURL: string;     // Firebase Storage download URL
  storagePath: string;     // Firebase Storage path
  previewUrl?: string;     // Preview URL (if available)
  sharedWith: string[];    // Array of user IDs with access
  metadata: {
    description?: string;  // Document description
    author?: string;       // Document author
    version?: string;      // Document version
    lastModified?: timestamp; // Last modification date
  }
  createdAt: timestamp;    // Upload timestamp
  updatedAt: timestamp;    // Last update timestamp
}
```

### Clients Collection
```typescript
/clients/{clientId}
{
  id: string;              // Client ID
  userId: string;          // Owner's user ID
  name: string;            // Client name
  email: string;           // Client email
  phone?: string;          // Client phone number
  company?: string;        // Company name
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  }
  notes?: string;          // Additional notes
  documents: string[];     // Array of associated document IDs
  createdAt: timestamp;    // Creation timestamp
  updatedAt: timestamp;    // Last update timestamp
}
```

### Tags Collection
```typescript
/tags/{tagId}
{
  id: string;              // Tag ID
  userId: string;          // Owner's user ID
  name: string;            // Tag name
  color?: string;          // Tag color (hex)
  description?: string;    // Tag description
  documentCount: number;   // Number of documents using this tag
  createdAt: timestamp;    // Creation timestamp
  updatedAt: timestamp;    // Last update timestamp
}
```

### Categories Collection
```typescript
/categories/{categoryId}
{
  id: string;              // Category ID
  userId: string;          // Owner's user ID
  name: string;            // Category name
  description?: string;    // Category description
  icon?: string;           // Category icon name
  color?: string;          // Category color (hex)
  documentCount: number;   // Number of documents in this category
  createdAt: timestamp;    // Creation timestamp
  updatedAt: timestamp;    // Last update timestamp
}
```

## Indexes

### Documents Collection Indexes
1. `userId` (ascending) + `createdAt` (descending)
2. `userId` (ascending) + `category` (ascending)
3. `userId` (ascending) + `tags` (array-contains)
4. `sharedWith` (array-contains) + `createdAt` (descending)

### Clients Collection Indexes
1. `userId` (ascending) + `name` (ascending)
2. `userId` (ascending) + `email` (ascending)

### Tags Collection Indexes
1. `userId` (ascending) + `name` (ascending)
2. `userId` (ascending) + `documentCount` (descending)

### Categories Collection Indexes
1. `userId` (ascending) + `name` (ascending)
2. `userId` (ascending) + `documentCount` (descending)

## Security Rules

The database is protected by Firestore security rules that ensure:
- Only authenticated users can access the database
- Users can only read and write their own data
- Shared documents are accessible to authorized users
- Document owners can manage their documents and sharing settings
- Client data is protected and only accessible to the owner
- Tags and categories are user-specific but readable by all authenticated users

## Data Validation

The following validation rules are enforced:
- Required fields must be present
- Email addresses must be valid
- File sizes must be positive numbers
- Timestamps must be valid
- Arrays must contain valid data types
- URLs must be valid
- Colors must be valid hex codes
- Document types must be valid MIME types