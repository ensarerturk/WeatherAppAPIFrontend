import React from 'react';

const AdminDashboard = ({ showUsers, showDeleteUser }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard!</p>

      {showUsers && (
        <div>
          <h2>Users</h2>
          <button onClick={showUsers}>Get All Users</button>
        </div>
      )}

      {showDeleteUser && (
        <div>
          <h2>Delete User</h2>
          <button onClick={showDeleteUser}>Delete User</button>
        </div>
      )}

      {/* Diğer admin işlemleri ve bileşenleri buraya ekleyebilirsiniz */}
    </div>
  );
};

export default AdminDashboard;