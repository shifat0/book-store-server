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

export const notFoundErrorResponse = (title?: string) => ({
  success: false,
  message: `No ${title || 'Data'} Found!`,
});

export const existsErrorResponse = (title: string) => ({
  success: false,
  message: `${title} already exists!`,
});
