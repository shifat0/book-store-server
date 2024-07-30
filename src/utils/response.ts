export const createResponse = (data?: any, title?: string) => ({
  success: true,
  message: `${title} created successfully`,
  data: data,
});

export const getResponse = (data: any) => ({
  success: true,
  message: `Data fetched successfully`,
  data: data,
});

export const errorResponse = (message: string) => ({
  success: false,
  message: message || 'Something went wrong!',
});

export const existsErrorResponse = (title: string) => ({
  success: false,
  message: `${title} already exists!`,
});
