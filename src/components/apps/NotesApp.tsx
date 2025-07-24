import React, { useState } from 'react';

const NotesApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Welcome Note', content: 'Welcome to the Notes app! Start writing your thoughts here.' },
    { id: 2, title: 'Todo List', content: '• Learn React\n• Build awesome apps\n• Deploy to production' }
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: ''
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (content: string) => {
    const updated = notes.map(note => 
      note.id === selectedNote.id ? { ...note, content } : note
    );
    setNotes(updated);
    setSelectedNote({ ...selectedNote, content });
  };

  return (
    <div className={`h-full flex ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`${dark ? 'bg-[#23232b] border-gray-700' : 'bg-white border-gray-200'} w-64 border-r p-4`}>
        <button
          onClick={createNewNote}
          className={`w-full rounded px-3 py-2 mb-4 font-semibold transition ${dark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          New Note
        </button>
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-3 rounded cursor-pointer transition font-medium truncate ${
                selectedNote.id === note.id
                  ? dark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-900'
                  : dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-sm text-gray-500 truncate">{note.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        {selectedNote && (
          <div className={`h-full ${dark ? 'bg-[#23232b]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${dark ? 'text-gray-100' : ''}`}>{selectedNote.title}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3 py-1 rounded transition ${dark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateNote(e.target.value)}
                className={`w-full h-full resize-none border rounded p-4 font-mono ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}
                placeholder="Start writing..."
              />
            ) : (
              <div className={`whitespace-pre-wrap font-mono p-4 rounded border h-full ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>{selectedNote.content}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp; 