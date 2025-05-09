import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StudentEvaluation from './StudentEvaluation';
import ProfessorEvaluation from './ProfessorEvaluation';
import StaffEvaluation from './StaffEvaluation';
import AdminEvaluationManagement from './AdminEvaluationManagement';

function CourseEvaluation() {
  const { user } = useAuth();
  
  // Render different views based on user role
  const renderEvaluationView = () => {
    switch (user?.role) {
      case 'Admin':
        return <AdminEvaluationManagement />;
      case 'Student':
        return <StudentEvaluation />;
      case 'Professor':
        return <ProfessorEvaluation />;
      case 'Staff':
        return <StaffEvaluation />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {renderEvaluationView()}
    </div>
  );
}

export default CourseEvaluation;