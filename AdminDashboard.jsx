import React, { useState } from 'react';

function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/admin/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleRemoveUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/admin/remove-user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input type="email" placeholder="User Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleRemoveUser}>Remove User</button>
      <div>{message}</div>
    </div>
  );
}

export default AdminDashboard;
