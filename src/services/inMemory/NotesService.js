const { nanoid } = require("nanoid");

class NotesServices {
  constructor() {
    this._notes = [];
  }

  // method addNote
  addNote({ title, body, tags }) {
    // inisialisasi
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // buat object
    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    // push ke array
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
    // mengembalikan array notes
    return this._notes;
  }

  // method getNoteByid
  getNoteByid(id) {
    // cari apakah datanya ada di array note sesuai dengan id
    const note = this._notes.filter((n) => n.id === id)[0];

    // jika datanya ga ada
    if (!note) {
      throw new Error("Catatan tidak ditemukan");
    }

    // kembalikan datanya sesuai id yang ada di array note
    return note;
  }

  // method editNoteById
  editNoteById(id, { title, body, tags }) {
    // mengambil index array sesuai dengan id
    const index = this._notes.findIndex((note) => note.id === id);

    // jika index tidak ada
    if (index === -1) {
      throw new Error("Gagal memperbarui catatan. Id tidak ditemukan");
    }

    // inisialisasi tanggal update
    const updatedAt = new Date().toISOString();

    // proses update
    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  // method deleteNoteById
  deleteNoteById(id) {
    // mencari index di array berdasarkan id
    const index = this._notes.findIndex((note) => note.id === id);

    // jika index tidak ada
    if (index === -1) {
      throw new Error("Catatan gagal dihapus. Id tidak ditemukan");
    }

    // proses hapus data
    this._notes.splice(index, 1);
  }
}

// TEST
