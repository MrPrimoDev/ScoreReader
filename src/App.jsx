import React, { useState } from 'react';
import ScoreSelector from './components/ScoreSelector';
import Settings from './components/Settings';

function App() {
  const [isFileView, setIsFileView] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      {isFileView && (
        <>
          <h1>Piano Score Viewer</h1>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ⚙️ Ustawienia
          </button>
        </>
      )}
      
      <ScoreSelector onViewChange={setIsFileView} />
      
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onSave={(path) => {
            // Tutaj możesz dodać logikę odświeżania listy nut
            console.log('Nowa ścieżka:', path);
          }}
        />
      )}
    </div>
  );
}

export default App;
