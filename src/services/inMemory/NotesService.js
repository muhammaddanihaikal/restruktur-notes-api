const { nanoid } = require("nanoid");

class NotesServices {
  constructor() {
    this._notes = [];
  }

  // method addNote
  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    // cek apakah datanya masuk
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    // lempar error jika gagal
    if (!isSuccess) {
      throw new Error("Catatn gagal ditambahkan");
    }

    // kembalikan id jika success
    return id;
  }

  // method getAllNote
  getNotes() {
    return this._notes;
  }

  // method getNoteByid
  getNoteByid(id) {
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error("Catatan tidak ditemukan");
    }

    return note;
  }
}

// TEST
