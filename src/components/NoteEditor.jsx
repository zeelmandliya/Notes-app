import React from 'react';
import { Trash2, FilePlus } from 'lucide-react';

/**
 * NoteEditor Component
 * Main right-hand panel where user reads and edits the selected note.
 * If no note is selected or available, displays an Empty State.
 * 
 * @param {Object|null} note - Active note object being edited
 * @param {Function} onUpdateNote - Callback to update note field (title or body)
 * @param {Function} onDeleteNote - Callback to delete current note
 * @param {Function} onCreateNote - Callback to create a note from empty state
 * @param {boolean} isSaving - Indicator whether debounced saving is in progress
 */
export default function NoteEditor({
  note,
  onUpdateNote,
  onDeleteNote,
  onCreateNote,
  isSaving
}) {
  // Empty State View when no note is selected or existing
  if (!note) {
    return (
      <div className="editor-container">
        <div className="empty-state">
          <div className="empty-state-icon">
            <FilePlus size={32} />
          </div>
          <h2 className="empty-state-title">No Note Selected</h2>
          <p className="empty-state-subtitle">
            Select a note from the sidebar or create your first note to start writing.
          </p>
          <button className="new-note-btn" style={{ width: 'auto' }} onClick={onCreateNote}>
            Create your first note
          </button>
        </div>
      </div>
    );
  }

  // Format last edited timestamp
  const formattedDate = new Date(note.updatedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="editor-container">
      {/* Editor Top Toolbar */}
      <div className="editor-toolbar">
        <div className="save-status">
          <span className={`save-status-dot ${isSaving ? 'saving' : ''}`}></span>
          <span>{isSaving ? 'Saving changes...' : 'All changes saved'}</span>
        </div>

        <button
          className="delete-note-btn"
          onClick={() => onDeleteNote(note.id)}
          title="Delete current note"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>

      {/* Main Editing Canvas */}
      <div className="editor-content">
        {/* Editable Title Input */}
        <input
          type="text"
          className="editor-title-input"
          placeholder="Title..."
          value={note.title}
          onChange={(e) => onUpdateNote('title', e.target.value)}
        />

        {/* Metadata Line */}
        <div className="editor-meta">
          Last edited on {formattedDate}
        </div>

        {/* Multi-line Body Textarea */}
        <textarea
          className="editor-body-textarea"
          placeholder="Start typing your note here..."
          value={note.body}
          onChange={(e) => onUpdateNote('body', e.target.value)}
        />
      </div>
    </div>
  );
}
