import React from 'react';
import { Trash2, FileText } from 'lucide-react';

/**
 * NoteList Component
 * Renders the scrollable list of note items in the sidebar.
 * 
 * @param {Array} notes - Array of note objects
 * @param {string|null} activeNoteId - ID of currently selected note
 * @param {Function} onSelectNote - Handler called when a note card is clicked
 * @param {Function} onDeleteNote - Handler called when delete icon is clicked
 */
export default function NoteList({ notes, activeNoteId, onSelectNote, onDeleteNote }) {
  // Format timestamp into a human-readable date/time string
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to extract a short preview snippet from the body
  const getSnippet = (body) => {
    if (!body || body.trim() === '') return '(No additional text)';
    return body.length > 60 ? body.substring(0, 60) + '...' : body;
  };

  if (notes.length === 0) {
    return (
      <div style={{ padding: '20px 14px', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        No notes found
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => {
        const isActive = note.id === activeNoteId;
        return (
          <div
            key={note.id}
            className={`note-card ${isActive ? 'active' : ''}`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="note-card-header">
              <span className="note-card-title">
                {note.title.trim() === '' ? 'Untitled Note' : note.title}
              </span>
            </div>

            <div className="note-card-snippet">
              {getSnippet(note.body)}
            </div>

            <div className="note-card-footer">
              <span className="note-card-date">
                {formatDate(note.updatedAt)}
              </span>
              
              {/* Stop propagation so clicking delete doesn't trigger parent card click */}
              <button
                className="delete-card-btn"
                title="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
