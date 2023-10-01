import React, { useState, useEffect } from "react";

function Biljeske() {
  // Initialize notes with an empty array by default
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Load notes from localStorage when the component mounts
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Validate timestamps before setting them in state
    const validatedNotes = savedNotes.map((note) => ({
      ...note,
      timestamp: new Date(note.timestamp),
    }));

    console.log("Saved Notes from localStorage:", validatedNotes);
    setNotes(validatedNotes);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => {
    // Update localStorage whenever notes change
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); // This effect runs whenever the notes state changes

  const addNote = () => {
    if (newNote.trim() === "") return;
    const updatedNotes = [...notes, { text: newNote, timestamp: new Date() }];
    setNotes(updatedNotes);
    setNewNote("");
  };

  const editNote = (index) => {
    setEditingIndex(index);
    setNewNote(notes[index].text);
  };

  const updateNote = () => {
    if (newNote.trim() === "") return;
    const updatedNotes = [...notes];
    updatedNotes[editingIndex] = {
      text: newNote,
      timestamp: notes[editingIndex].timestamp,
    };
    setNotes(updatedNotes);
    setEditingIndex(null);
    setNewNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mb-2">
            <div className="card-body">
              <input
                type="text"
                placeholder="Dodaj bilješku..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="form-control"
              />
              {editingIndex === null ? (
                <button onClick={addNote} className="btn btn-success mt-2">
                  Dodaj
                </button>
              ) : (
                <button onClick={updateNote} className="btn btn-primary mt-2">
                  Spremi
                </button>
              )}
            </div>
          </div>
          <div>
            {notes.map((note, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <p>{note.text}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">
                        {note.timestamp instanceof Date ? (
                          <>
                            {note.timestamp.toLocaleTimeString()} |{" "}
                            {note.timestamp.toLocaleDateString()}
                          </>
                        ) : (
                          "Invalid Timestamp"
                        )}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => editNote(index)}
                        className="btn btn-primary btn-sm mr-2">
                        Uredi
                      </button>
                      <button
                        onClick={() => deleteNote(index)}
                        className="btn btn-danger btn-sm">
                        Izbriši
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biljeske;
