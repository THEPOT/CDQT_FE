import React, { useState, useEffect } from 'react';
import { updateRegistrationStatusAPI, getRegistrationPeriodByIdAPI } from '../../../apis/termAPI';

function RegistrationPeriodStatus({ periodId }) {
  const [status, setStatus] = useState('');
  const [periodInfo, setPeriodInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: 'CLOSED', label: 'Đóng cổng đăng ký', color: 'bg-error/10 text-error border-error/20', icon: 'lock' },
    { value: 'OPEN', label: 'Mở cổng đăng ký', color: 'bg-success/10 text-success border-success/20', icon: 'unlock' },
    { value: 'MAINTENANCE', label: 'Bảo trì hệ thống', color: 'bg-warning/10 text-warning border-warning/20', icon: 'wrench' }
  ];

  useEffect(() => {
    if (periodId) {
      fetchPeriodStatus();
    }
  }, [periodId]);

  const fetchPeriodStatus = async () => {
    if (!periodId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getRegistrationPeriodByIdAPI(periodId);
      setPeriodInfo(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching registration period details:', error);
      setError('Không thể tải thông tin đợt đăng ký. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (status === newStatus) return;
    
    setIsUpdating(true);
    setError(null);
    
    const toastId = `status-toast-${Date.now()}`;
    
    try {
      await updateRegistrationStatusAPI(periodId, newStatus);
      setStatus(newStatus);
      
      // Show success toast
      showToast(toastId, 'success', `Đã chuyển trạng thái thành ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error('Error updating registration status:', error);
      setError('Không thể cập nhật trạng thái. Vui lòng thử lại sau.');
      
      // Show error toast
      showToast(toastId, 'error', 'Cập nhật trạng thái thất bại');
    } finally {
      setIsUpdating(false);
    }
  };

  const showToast = (id, type, message) => {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast toast-top toast-end';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.id = id;
    toast.className = `alert alert-${type} fade-in`;
    toast.innerHTML = `<div><span>${message}</span></div>`;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (document.getElementById(id)) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const getStatusLabel = (statusValue) => {
    const option = statusOptions.find(opt => opt.value === statusValue);
    return option ? option.label : statusValue;
  };

  const renderStatusIcon = (iconName) => {
    switch(iconName) {
      case 'lock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'unlock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        );
      case 'wrench':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  if (!periodInfo) {
    return (
      <div className="text-center p-4">
        <p>Vui lòng chọn đợt đăng ký để xem chi tiết.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Kỳ học</div>
          <div className="stat-value text-lg">{periodInfo.semesterName}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Tín chỉ tối đa</div>
          <div className="stat-value text-lg">{periodInfo.maxCredits} TC</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Thời gian bắt đầu</div>
          <div className="stat-value text-lg">{new Date(periodInfo.startDate).toLocaleString('vi-VN')}</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Thời gian kết thúc</div>
          <div className="stat-value text-lg">{new Date(periodInfo.endDate).toLocaleString('vi-VN')}</div>
        </div>
      </div>

      {/* Status Controls */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title text-lg font-medium mb-2">Thay đổi trạng thái cổng đăng ký</h3>
          <p className="text-sm text-base-content/70 mb-4">
            Chọn một trong các trạng thái dưới đây để điều chỉnh đợt đăng ký
          </p>
          
          <div className="flex flex-col gap-3">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                disabled={isUpdating || status === option.value}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-all
                  ${status === option.value 
                    ? option.color + ' border-2' 
                    : 'bg-base-100 border-base-300 hover:bg-base-200'}
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${status === option.value 
                      ? option.color.replace('bg-', 'bg-').replace('/10', '/20') 
                      : 'bg-base-200'}`}>
                    {renderStatusIcon(option.icon)}
                  </span>
                  <span className="font-medium">{option.label}</span>
                </span>
                
                {status === option.value ? (
                  <div className="badge badge-primary">Trạng thái hiện tại</div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
  
          {isUpdating && (
            <div className="mt-4 flex justify-center text-base-content/60">
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Đang cập nhật trạng thái...
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        
        .fade-out {
          animation: fadeOut 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default RegistrationPeriodStatus;