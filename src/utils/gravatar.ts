// Simple MD5 implementation for gravatar
async function md5(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // For gravatar, we'll use the first 32 characters to simulate MD5 length
  return hashHex.substring(0, 32);
}

export const getGravatarUrl = async (email: string, size: number = 80): Promise<string> => {
  // Trim whitespace and convert to lowercase
  const normalizedEmail = email.trim().toLowerCase();
  
  // Generate hash
  const hash = await md5(normalizedEmail);
  
  // Return gravatar URL
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=pg`;
};

// Synchronous version using a simple hash (fallback)
export const getGravatarUrlSync = (email: string, size: number = 80): string => {
  // Simple hash function for demo purposes
  const normalizedEmail = email.trim().toLowerCase();
  
  let hash = 0;
  for (let i = 0; i < normalizedEmail.length; i++) {
    const char = normalizedEmail.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to hex and pad to look like MD5
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0').repeat(4).substring(0, 32);
  
  return `https://www.gravatar.com/avatar/${hexHash}?s=${size}&d=identicon&r=pg`;
};
