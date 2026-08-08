import React from 'react';
import { Plus, Search, BookOpen } from 'lucide-react';
import NoteList from './NoteList';

/**
 * Sidebar Component
 * Left panel containing header, search filter, action button, and list of notes.
 * 
 * @param {Array} notes - Array of note objects
 * @param {string|null} activeNoteId - ID of active note
 * @param {Function} onSelectNote - Function to select note
 * @param {Function} onCreateNote - Function to create new note
 * @param {Function} onDeleteNote - Function to delete note
 * @param {string} searchQuery - Current search filter text
 * @param {Function} setSearchQuery - Search filter state setter
 */
export default function Sidebar({
  notes,
  activeNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  searchQuery,
  setSearchQuery
}) {
  // Filter notes based on title or content matching search query
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = note.title.toLowerCase().includes(query);
    const matchesBody = note.body.toLowerCase().includes(query);
    return matchesTitle || matchesBody;
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* App Title */}
        <div className="sidebar-title">
          <BookOpen size={22} />
          <span>QuickNote</span>
        </div>

        {/* Action Button: Create New Note */}
        <button className="new-note-btn" onClick={onCreateNote}>
          <Plus size={18} />
          <span>New Note</span>
        </button>

        {/* Search Input Bar */}
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Render Note List */}
      <NoteList
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        onSelectNote={onSelectNote}
        onDeleteNote={onDeleteNote}
      />
    </aside>
  );
}
