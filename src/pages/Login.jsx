import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi gửi
    setIsLoading(true);

    try {
      const body = {
        email,
        password,
      };
      await login(body); // Gọi hàm login từ AuthContext
      navigate('/'); // Điều hướng sau khi đăng nhập thành công
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl border border-gray-200">
        {/* Tiêu đề */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text">Đăng nhập</h2>
          <p className="text-gray-500 text-sm mt-1">Vui lòng nhập thông tin để truy cập hệ thống</p>
        </div>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@example.com"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Mật khẩu
              </label>
              <a
                href="#"
                className="text-sm text-primary hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
              required
            />
          </div>

          {/* Nhớ mật khẩu */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Ghi nhớ đăng nhập
            </label>
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Thông tin bổ sung */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Liên hệ hỗ trợ:{' '}
            <a href="mailto:support@example.com" className="text-primary hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;