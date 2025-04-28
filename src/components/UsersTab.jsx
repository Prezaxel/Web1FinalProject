import React, { useState, useEffect } from 'react';

function UsersTab() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleDelete = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleSaveEdit = () => {
        const updatedUsers = users.map((u) =>
            u.email === editingUser.email ? editingUser : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setEditingUser(null);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h3>👥 Users Management</h3>
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ textAlign: 'left' }}>Name</th>
                    <th style={{ textAlign: 'left' }}>Email</th>
                    <th style={{ textAlign: 'left' }}>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.email} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.email === 'admin@techstore.com' ? 'Admin' : 'User'}</td>
                        <td>
                            <button
                                style={{
                                    backgroundColor: '#ffa726',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '4px',
                                    marginRight: '0.5rem',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleEdit(user)}
                            >
                                Edit
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#ef5350',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDelete(user.email)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingUser && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '10px' }}>
                    <h4>Edit User</h4>
                    <input
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        placeholder="Name"
                        style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <input
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        placeholder="Email"
                        style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <input
                        type="password"
                        value={editingUser.password || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                        placeholder="Password"
                        style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <select
                        value={editingUser.role || (editingUser.email === 'admin@techstore.com' ? 'Admin' : 'User')}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem' }}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button
                        onClick={handleSaveEdit}
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditingUser(null)}
                        style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default UsersTab;
