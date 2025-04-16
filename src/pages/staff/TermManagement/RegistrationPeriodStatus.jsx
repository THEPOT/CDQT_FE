/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { updateRegistrationStatusAPI } from "../../../apis/termAPI";
import {
  RiCloseLine,
  RiLockLine,
  RiLockUnlockLine,
  RiSettings4Line,
} from "react-icons/ri";
import { ImSpinner8 } from 'react-icons/im';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { HiOutlineCheckCircle } from 'react-icons/hi';

function RegistrationPeriodStatus({ periodId }) {
  const [status, setStatus] = useState("CLOSED");
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Hiệu ứng fade in khi component mount
    setFadeIn(true);
  }, []);
  
  const statusOptions = [
    {
      value: "CLOSED",
      label: "Đóng cổng đăng ký",
      color: "bg-red-100 text-red-800 border-red-200",
      hoverColor: "hover:bg-red-50",
      activeColor: "bg-red-100",
      icon: <RiLockLine className="w-5 h-5" />,
      description: "Sinh viên không thể đăng ký hoặc hủy đăng ký các khóa học",
    },
    {
      value: "OPEN",
      label: "Mở cổng đăng ký",
      color: "bg-green-100 text-green-800 border-green-200",
      hoverColor: "hover:bg-green-50",
      activeColor: "bg-green-100",
      icon: <RiLockUnlockLine className="w-5 h-5" />,
      description: "Sinh viên có thể đăng ký và hủy đăng ký các khóa học",
    },
    {
      value: "MAINTENANCE",
      label: "Bảo trì hệ thống",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      hoverColor: "hover:bg-yellow-50",
      activeColor: "bg-yellow-100",
      icon: <RiSettings4Line className="w-5 h-5" />,
      description: "Cổng đăng ký tạm thời đóng để bảo trì",
    },
  ];

  const handleStatusChange = async (newStatus) => {
    if (status === newStatus) return;
    try {
      setIsLoading(true);
      await updateRegistrationStatusAPI(periodId, newStatus);
      setStatus(newStatus);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // You can add a toast notification here
    } catch (error) {
      console.error("Error updating registration status:", error);
      // You can add an error toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = () => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : "";
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Trạng thái cổng đăng ký
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusOptions.find((opt) => opt.value === status)?.color
          }`}
        >
          {getStatusText()}
        </div>
      </div>

      {/* Success notification */}
      {showSuccess && (
        <div className="mx-6 mt-4 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50">
          <IoIosCheckmarkCircle className="w-5 h-5 mr-2" />
          <span>Cập nhật trạng thái thành công!</span>
          <button onClick={() => setShowSuccess(false)} className="ml-auto">
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">
          Chọn trạng thái phù hợp để quản lý việc đăng ký học của sinh viên.
        </p>

        <div className="space-y-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              disabled={isLoading || status === option.value}
              className={`
                w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200
                ${
                  status === option.value
                    ? option.color
                    : `border-gray-200 ${option.hoverColor}`
                }
                ${
                  isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }
                ${status === option.value ? "shadow-sm" : ""}
              `}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    status === option.value ? option.activeColor : "bg-gray-100"
                  }`}
                >
                  {option.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              {status === option.value && (
                <div className="flex items-center text-sm font-medium">
                  <HiOutlineCheckCircle className="w-5 h-5 mr-1" />
                  Đang áp dụng
                </div>
              )}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="mt-4 text-center text-gray-600 flex items-center justify-center">
            <ImSpinner8 className="w-5 h-5 mr-2 animate-spin" />
            Đang cập nhật trạng thái...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Thay đổi trạng thái sẽ được áp dụng ngay lập tức và ảnh hưởng đến tất
          cả sinh viên.
        </p>
      </div>
    </div>
  );
}

export default RegistrationPeriodStatus;
