export interface DecodedToken {
  uid: string
  email?: string
  email_verified?: boolean
  name?: string
  picture?: string
}

export async function verifyFirebaseToken(idToken: string): Promise<DecodedToken> {
  try {
    // For development, we'll decode the JWT payload manually
    // In production, you would use Firebase Admin SDK to verify the token properly
    
    if (idToken.startsWith('ey')) {
      try {
        // Decode the JWT payload (this is just for demo - in production use Firebase Admin SDK)
        const payload = JSON.parse(atob(idToken.split('.')[1]))
        
        return {
          uid: payload.user_id || payload.sub || 'user_' + Date.now(),
          email: payload.email || 'user@contentoscope.com',
          email_verified: payload.email_verified !== false,
          name: payload.name || payload.display_name || 'ContentScope User',
          picture: payload.picture || payload.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name || 'User')}&background=4F46E5&color=fff`
        }
      } catch (decodeError) {
        console.log('JWT decode failed, using fallback')
      }
    }

    // Fallback for development/testing
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    return {
      uid: userId,
      email: 'user@contentoscope.com',
      email_verified: true,
      name: 'ContentScope User',
      picture: `https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff`
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    throw new Error('Invalid authentication token')
  }
}

export async function createCustomToken(uid: string): Promise<string> {
  try {
    return `custom-token-${uid}`
  } catch (error) {
    console.error('Custom token creation failed:', error)
    throw new Error('Failed to create custom token')
  }
}