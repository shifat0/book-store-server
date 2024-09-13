import {
  IPaginatedResponse,
  IPagination,
  IResponse,
  IResponseWithData,
} from '../types/types';

export const createResponse = <T>(
  data: T,
  title?: string,
): IResponseWithData<T> => ({
  success: true,
  message: `${title} created successfully`,
  data: data,
});

export const getResponse = <T>(
  data: T,
  pagination?: IPagination,
): IPaginatedResponse<T> => ({
  success: true,
  message: `Data fetched successfully`,
  pagination,
  data: data,
});

export const updateResponse = <T>(
  title: string,
  data: T,
): IResponseWithData<T> => ({
  success: true,
  message: `${title} updated successfully`,
  data: data,
});

export const deleteResponse = (title: string): IResponse => ({
  success: true,
  message: `${title} deleted successfully`,
});

export const errorResponse = (message?: string): IResponse => ({
  success: false,
  message: message || 'Something went wrong!',
});

export const notFoundErrorResponse = (title?: string): IResponse => ({
  success: false,
  message: `${title || 'Data'} Not Found!`,
});

export const existsErrorResponse = (title: string): IResponse => ({
  success: false,
  message: `${title} already exists!`,
});
