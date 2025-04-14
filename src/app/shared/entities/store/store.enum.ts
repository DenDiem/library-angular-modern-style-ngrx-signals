  export const FEATURE_KEYS = {
    BOOKS: 'books'
  } as const; 

  export type FeatureKey = typeof FEATURE_KEYS[keyof typeof FEATURE_KEYS];