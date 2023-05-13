const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

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

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = (request, h) => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  // tangkap id dari params
  const { id } = request.params;

  // filter notesnya sesuai id
  const note = notes.filter((e) => e.id === id)[0];

  // kalo respon success
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  // kalo respon gagal
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  // ambil id dari params
  const { id } = request.params;

  // ambil data dari body
  const { title, tags, body } = request.payload;
  // buat tanggal update/ waktu sekarang
  const updatedAt = new Date().toISOString();

  // PROSESS UPDATE
  // ambil index-nya dulu
  const index = notes.findIndex((note) => note.id === id);

  // kalo index ada
  if (index !== -1) {
    // diganti / ditimpa datanya
    notes[index] = { ...notes[index], title, tags, body, updatedAt };

    // berikan respon
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
      data: {
        note: notes[index],
      },
    });
    response.code(200);
    return response;
  }

  // kalo index ga ada
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // cari index
  const index = notes.findIndex((e) => e.id === id);

  // kalo index ada
  if (index !== -1) {
    // penghapusan data dalam array sesuai index
    notes.splice(index, 1);

    // berikan response
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  // kalo index ga ada
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
