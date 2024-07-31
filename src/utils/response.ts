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

export const updateResponse = (title: string, data?: any) => ({
  success: true,
  message: `${title} updated successfully`,
  data: data,
});

export const deleteResponse = (title: string, data?: any) => ({
  success: true,
  message: `${title} deleted successfully`,
});

export const errorResponse = (message?: string) => ({
  success: false,
  message: message || 'Something went wrong!',
});

export const notFoundErrorResponse = (title?: string) => ({
  success: false,
  message: `${title || 'Data'} Not Found!`,
});

export const existsErrorResponse = (title: string) => ({
  success: false,
  message: `${title} already exists!`,
});
