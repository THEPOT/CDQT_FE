import React, { useState } from 'react';
import { updateRegistrationStatusAPI } from '../../../apis/termAPI';

function RegistrationPeriodStatus({ periodId }) {
    const [status, setStatus] = useState('CLOSED');
    const [isLoading, setIsLoading] = useState(false);
  
    const statusOptions = [
      { value: 'CLOSED', label: 'Đóng cổng đăng ký', color: 'bg-red-100 text-red-800' },
      { value: 'OPEN', label: 'Mở cổng đăng ký', color: 'bg-green-100 text-green-800' },
      { value: 'MAINTENANCE', label: 'Bảo trì hệ thống', color: 'bg-yellow-100 text-yellow-800' }
    ];
  
    const handleStatusChange = async (newStatus) => {
      try {
        setIsLoading(true);
        await updateRegistrationStatusAPI(periodId, newStatus);
        setStatus(newStatus);
        // You can add a toast notification here
      } catch (error) {
        console.error('Error updating registration status:', error);
        // You can add an error toast notification here
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Trạng thái cổng đăng ký</h3>
        
        <div className="flex flex-col gap-3">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              disabled={isLoading || status === option.value}
              className={`
                flex items-center justify-between p-4 rounded-lg border
                ${status === option.value ? option.color : 'hover:bg-gray-50'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  status === option.value ? 'bg-current' : 'bg-gray-300'
                }`} />
                {option.label}
              </span>
              
              {status === option.value && (
                <span className="text-sm font-medium">Trạng thái hiện tại</span>
              )}
            </button>
          ))}
        </div>
  
        {isLoading && (
          <div className="mt-4 text-center text-gray-500">
            Đang cập nhật trạng thái...
          </div>
        )}
      </div>
    );
  }
  
  export default RegistrationPeriodStatus;
