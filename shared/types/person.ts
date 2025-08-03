export interface Person {
  id: string
  avatar: string
  first_name: string
  last_name: string
  age: number
  nationality: string
  hobbies: string[]
}

export interface PersonFilters {
  nationality?: string[]
  hobbies?: string[]
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface FilterOptionsResponse {
  hobbies: Array<{ name: string; count: number }>
  nationalities: Array<{ name: string; count: number }>
}