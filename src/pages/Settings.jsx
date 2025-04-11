import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiSave, FiLock } from 'react-icons/fi';

function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    displayName: user?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Settings updated:', formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cài đặt tài khoản</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Settings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
            <div className="grid gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tên hiển thị</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
            <div className="grid gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mật khẩu hiện tại</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mật khẩu mới</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Xác nhận mật khẩu mới</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">
              <FiSave className="mr-2" />
              Lưu thay đổi
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              })}
            >
              <FiLock className="mr-2" />
              Hủy đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;