import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';

// Storage Key for browser LocalStorage
const LOCAL_STORAGE_KEY = 'quicknote_notes_data';

// Starter default notes for first-time users / Git demo initialization
const DEFAULT_NOTES = [
  {
    id: '1',
    title: '🚀 Welcome to QuickNote',
    body: 'This is a simple React note-taking app designed for Git demonstration sessions.\n\nYou can:\n- Create new notes with the "+ New Note" button\n- Edit titles and body text in real-time\n- Search notes using the search bar\n- Delete notes when no longer needed\n\nAll changes are automatically saved to your browser local storage!',
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000
  },
  {
    id: '2',
    title: '💡 Git Demo Commands Cheat Sheet',
    body: 'Commands to demonstrate during session:\n\n1. git init\n2. git status\n3. git add .\n4. git commit -m "Initial commit"\n5. git branch feature/theme\n6. git checkout feature/theme\n7. git merge feature/theme',
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now() - 7200000
  }
];

export default function App() {
  // ---------------------------------------------------------------------------
  // State Management (React useState hook)
  // ---------------------------------------------------------------------------

  // State: List of all notes (initialized from LocalStorage or default fallback)
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedNotes ? JSON.parse(savedNotes) : DEFAULT_NOTES;
    } catch (error) {
      console.error('Failed to load notes from LocalStorage:', error);
      return DEFAULT_NOTES;
    }
  });

  // State: Currently selected note ID
  const [activeNoteId, setActiveNoteId] = useState(() => {
    return notes.length > 0 ? notes[0].id : null;
  });

  // State: Search filter text
  const [searchQuery, setSearchQuery] = useState('');

  // State: Saving status indicator (for debounced save animation)
  const [isSaving, setIsSaving] = useState(false);

  // Ref: Holds timeout ID for debounced localStorage persistence
  const saveTimeoutRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Debounced LocalStorage Persistence (React useEffect & useRef)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // Show saving indicator briefly
    setIsSaving(true);

    // Clear previous pending timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set debounced timer (saves after 400ms of user inactivity)
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
        setIsSaving(false);
      } catch (error) {
        console.error('Failed to save notes to LocalStorage:', error);
        setIsSaving(false);
      }
    }, 400);

    // Cleanup timer on unmount or re-effect
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [notes]);

  // ---------------------------------------------------------------------------
  // Note Action Handlers
  // ---------------------------------------------------------------------------

  // Create a new note and set it as active
  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      body: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // Prepend new note to list
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  // Update a specific field ('title' or 'body') of the active note
  const handleUpdateNote = (field, value) => {
    if (!activeNoteId) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            [field]: value,
            updatedAt: Date.now()
          };
        }
        return note;
      })
    );
  };

  // Delete a note by ID
  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);

    // If the active note was deleted, switch active selection to another note
    if (activeNoteId === idToDelete) {
      if (updatedNotes.length > 0) {
        setActiveNoteId(updatedNotes[0].id);
      } else {
        setActiveNoteId(null);
      }
    }
  };

  // Find active note object from list
  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  // ---------------------------------------------------------------------------
  // Render App Structure
  // ---------------------------------------------------------------------------
  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Right Note Editor */}
      <NoteEditor
        note={activeNote}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        onCreateNote={handleCreateNote}
        isSaving={isSaving}
      />
    </div>
  );
}
