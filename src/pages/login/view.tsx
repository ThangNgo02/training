import React from 'react'
import Input from '@/components/input'
import Button from '@/components/button'

interface ILoginView {
  isLoading: boolean
  handleSubmit: (e: React.FormEvent) => void
  email: string
  setEmail: (val: string) => void
  password: string
  setPassword: (val: string) => void
  errorEmail?: string
  errorPassword?: string
  apiError?: string
}

const LoginView: React.FC<ILoginView> = ({
  isLoading,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errorEmail,
  errorPassword,
  apiError,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <img
            className="w-24 mx-auto"
            src="https://tsp.com.vn/storage/general/logo-tsp.png"
            alt="Logo"
          />
          <h2 className="text-2xl font-bold mt-4">Đăng nhập</h2>
        </div>

        <Input
          name="Tên đăng nhập"
          typeInput="text"
          placeholder="Nhập tên đăng nhập"
          errorInput={errorEmail}
          setValue={setEmail}
          value={email}
        />

        <Input
          name="Mật khẩu"
          typeInput="password"
          placeholder="Nhập mật khẩu"
          errorInput={errorPassword}
          setValue={setPassword}
          value={password}
        />

        {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}

        <Button type="submit" variant="primary" className="w-full mt-4">
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>
    </div>
  )
}

export default LoginView
