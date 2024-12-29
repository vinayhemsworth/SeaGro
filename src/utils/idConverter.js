import { v5 as uuidv5 } from 'uuid'; // You'll need to install uuid package: npm install uuid

// Namespace for consistent UUID generation
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export const mongoIdToUUID = (mongoId) => {
  // Convert MongoDB ObjectId to UUID v5 (consistent conversion)
  return uuidv5(mongoId.toString(), NAMESPACE);
}; 