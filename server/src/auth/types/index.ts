export type UserRole = 'client' | 'freelance' | 'admin' //this is called a union type

export interface AuthUser {
    id: number //we use number because in the db we have SERIAL and it needs to match
    email: string
    role: UserRole
}

export interface JWTPayload {
    id: number
    email: string
    role: UserRole
}