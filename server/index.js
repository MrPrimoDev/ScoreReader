const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// ... (poprzedni kod)

// Endpoint do zapisywania ustawień
app.post('/api/settings', async (req, res) => {
  try {
    const { scorePath } = req.body;
    
    // Sprawdź, czy ścieżka istnieje
    await fs.access(scorePath);
    
    // Zapisz ścieżkę do pliku konfiguracyjnego
    await fs.writeFile(
      path.join(__dirname, 'config.json'),
      JSON.stringify({ scorePath }, null, 2)
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ 
      error: 'Nieprawidłowa ścieżka lub brak dostępu do folderu' 
    });
  }
});

// Endpoint do pobierania ustawień
app.get('/api/settings', async (req, res) => {
  try {
    const config = await fs.readFile(
      path.join(__dirname, 'config.json'),
      'utf-8'
    );
    res.json(JSON.parse(config));
  } catch (error) {
    res.json({ scorePath: '' });
  }
}); 