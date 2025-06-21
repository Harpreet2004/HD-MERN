import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.notes);
      } catch (err) {
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  const handleCreateNote = async () => {
    const title = prompt('Enter note title');
    if (!title) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/notes`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes([...notes, res.data.note]);
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-xs">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src="/hd-icon.png" alt="HD" className="w-5 h-5" />
            <h1 className="font-medium text-md">Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-blue-600 hover:underline"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome card */}
        <div className="bg-white-100 rounded-xl p-4 shadow mb-4">
          <p className="font-semibold text-sm">Welcome, {user.name || 'User'} !</p>
          <p className="text-xs text-gray-600">Email: {user.email || 'xxxxxx@xxxx.com'}</p>
        </div>

        {/* Create Note button */}
        <button
          onClick={handleCreateNote}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm mb-4 hover:bg-blue-700 transition"
        >
          Create Note
        </button>

        {/* Notes list */}
        <h2 className="text-sm font-medium mb-2">Notes</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading notes...</p>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white-100 flex justify-between items-center px-3 py-2 rounded-lg shadow-sm"
              >
                <p className="text-sm">{note.title}</p>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-sm text-gray-600 hover:text-red-500"
                  title="Delete note"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
