import axios, { AxiosError } from "axios";
import type { ApiResponse } from "../types/Character";

const BASE_URL = "https://rickandmortyapi.com/api";

export interface ApiError {
  message: string;
  status?: number;
}

export class RickAndMortyApiService {
  private static handleAxiosError(error: AxiosError): ApiError {
    if (error.response) {
      const errorMessage = (error.response.data as any)?.error || error.message;
      return {
        message: errorMessage,
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        message: "Network error - no response received",
      };
    } else {
      return {
        message: error.message || "An unexpected error occurred",
      };
    }
  }

  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleAxiosError(error);
      }
      throw { message: "Failed to fetch data" } as ApiError;
    }
  }

  /**
   * Fetch all characters with pagination
   * @param page - Page number (default: 1)
   * @returns Promise<ApiResponse>
   */
  static async getCharacters(page: number = 1): Promise<ApiResponse> {
    const url = `${BASE_URL}/character?page=${page}`;
    return this.fetchWithErrorHandling<ApiResponse>(url);
  }

  /**
   * Search characters by name
   * @param name - Character name to search for
   * @param page - Page number (default: 1)
   * @returns Promise<ApiResponse>
   */
  static async searchCharacters(
    name: string,
    page: number = 1
  ): Promise<ApiResponse> {
    const encodedName = encodeURIComponent(name);
    const url = `${BASE_URL}/character/?name=${encodedName}&page=${page}`;
    return this.fetchWithErrorHandling<ApiResponse>(url);
  }
}

export default RickAndMortyApiService;
