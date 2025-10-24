// Mock contact data for the application
export const mockContacts = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    tags: ["work", "business"]
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    tags: ["friends"]
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 (555) 345-6789",
    tags: ["family"]
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    tags: ["work"]
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 567-8901",
    tags: ["family", "emergency"]
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@email.com",
    phone: "+1 (555) 678-9012",
    tags: ["business"]
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@email.com",
    phone: "+1 (555) 789-0123",
    tags: ["friends", "work"]
  },
  {
    id: 8,
    name: "Henry Taylor",
    email: "henry.taylor@email.com",
    phone: "+1 (555) 890-1234",
    tags: []
  }
];

// Default available tags
export const defaultTags = [
  { id: 'work', name: 'Work', color: '#007bff' },
  { id: 'family', name: 'Family', color: '#28a745' },
  { id: 'friends', name: 'Friends', color: '#ffc107' },
  { id: 'business', name: 'Business', color: '#6f42c1' },
  { id: 'emergency', name: 'Emergency', color: '#dc3545' },
];

// Contact data model/interface (for reference)
export const contactSchema = {
  id: "number", // unique identifier
  name: "string", // full name
  email: "string", // email address
  phone: "string", // phone number with formatting
  tags: "array" // array of tag IDs
};