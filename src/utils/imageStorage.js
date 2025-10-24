// Utility functions for handling image storage in localStorage

const IMAGE_STORAGE_KEY = 'tria_contact_images';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit for all images

/**
 * Get all stored images
 */
export const getStoredImages = () => {
  try {
    const stored = localStorage.getItem(IMAGE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load stored images:', error);
    return {};
  }
};

/**
 * Store an image for a contact
 */
export const storeContactImage = (contactId, imageDataUrl) => {
  try {
    const storedImages = getStoredImages();
    
    // Calculate current storage size
    const currentSize = JSON.stringify(storedImages).length;
    const newImageSize = imageDataUrl.length;
    
    // Check if adding this image would exceed storage limit
    if (currentSize + newImageSize > MAX_STORAGE_SIZE) {
      // Remove oldest images to make space
      const imageEntries = Object.entries(storedImages);
      imageEntries.sort((a, b) => (a[1].timestamp || 0) - (b[1].timestamp || 0));
      
      let freedSpace = 0;
      const imagesToRemove = [];
      
      for (const [id, data] of imageEntries) {
        imagesToRemove.push(id);
        freedSpace += JSON.stringify(data).length;
        
        if (freedSpace >= newImageSize) {
          break;
        }
      }
      
      // Remove old images
      imagesToRemove.forEach(id => delete storedImages[id]);
    }
    
    // Store the new image with timestamp
    storedImages[contactId] = {
      data: imageDataUrl,
      timestamp: Date.now()
    };
    
    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(storedImages));
    return true;
  } catch (error) {
    console.warn('Failed to store contact image:', error);
    return false;
  }
};

/**
 * Get an image for a specific contact
 */
export const getContactImage = (contactId) => {
  try {
    const storedImages = getStoredImages();
    return storedImages[contactId]?.data || null;
  } catch (error) {
    console.warn('Failed to get contact image:', error);
    return null;
  }
};

/**
 * Remove an image for a specific contact
 */
export const removeContactImage = (contactId) => {
  try {
    const storedImages = getStoredImages();
    delete storedImages[contactId];
    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(storedImages));
    return true;
  } catch (error) {
    console.warn('Failed to remove contact image:', error);
    return false;
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageStats = () => {
  try {
    const storedImages = getStoredImages();
    const totalSize = JSON.stringify(storedImages).length;
    const imageCount = Object.keys(storedImages).length;
    
    return {
      totalSize,
      imageCount,
      maxSize: MAX_STORAGE_SIZE,
      usagePercentage: (totalSize / MAX_STORAGE_SIZE) * 100
    };
  } catch (error) {
    console.warn('Failed to get storage stats:', error);
    return {
      totalSize: 0,
      imageCount: 0,
      maxSize: MAX_STORAGE_SIZE,
      usagePercentage: 0
    };
  }
};

/**
 * Clear all stored images
 */
export const clearAllImages = () => {
  try {
    localStorage.removeItem(IMAGE_STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Failed to clear images:', error);
    return false;
  }
};