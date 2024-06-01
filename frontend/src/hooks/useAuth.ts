export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto extends LoginDto {
  name: string
  surname: string
}

export const useAuth = () => {
  const login = (loginDto: LoginDto) => {
    console.log(loginDto)
  }

  const register = (registerDto: RegisterDto) => {
    console.log(registerDto)
  }

  return { login, register }
}
