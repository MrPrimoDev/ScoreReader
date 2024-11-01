import React, { useState } from 'react';

function Settings({ onClose, onSave }) {
  const [scorePath, setScorePath] = useState(localStorage.getItem('scorePath') || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Wysyłamy ścieżkę do API
      const response = await fetch('http://localhost:3002/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scorePath }),
      });

      if (!response.ok) {
        throw new Error('Nie udało się zapisać ustawień');
      }

      localStorage.setItem('scorePath', scorePath);
      onSave(scorePath);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ marginBottom: '20px' }}>Ustawienia</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              Ścieżka do folderu z nutami:
            </label>
            <input
              type="text"
              value={scorePath}
              onChange={(e) => setScorePath(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
              Wprowadź pełną ścieżkę do folderu z nutami
            </small>
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              Anuluj
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings; 