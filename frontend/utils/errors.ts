export class NFTMarketplaceError extends Error {
    constructor(
      message: string,
      public code: string,
      public details?: any
    ) {
      super(message);
      this.name = 'NFTMarketplaceError';
    }
  }
  
  export const handleError = (error: any) => {
    console.error('Error:', error);
    
    if (error instanceof NFTMarketplaceError) {
      return {
        message: error.message,
        code: error.code
      };
    }
  
    if (error.code === 4001) {
      return {
        message: 'Transaction rejected by user',
        code: 'USER_REJECTED'
      };
    }
  
    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  };