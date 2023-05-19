class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  // method postNoteHandler
  postNoteHandler(request, h) {
    try {
      // inisialisasi
      const { title = "untitled", body, tags } = request.payload;

      // ambil id dari service addNote()
      const noteId = this._service.addNote({ title, body, tags });

      // note :
      // tidak perlu ada validasi, soalnya masalah itu sudah di handle sama service

      // response success
      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      // response error
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this.service.getNotes();
    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
      // ambil id dari request params
      const { id } = request.params;

      // ambil data sesuai id
      const note = this._service.getNoteById(id);

      // kembalikan response success
      return {
        status: "success",
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        // response error
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      // mengambil id dari request params
      const { id } = request.params;

      // proses edit data
      this._service.editNoteById(id, request.payload);

      // kembalikan response success
      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (error) {
      // response error
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.status(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
      // mengambil id dari reqest params
      const { id } = request.params;

      // proses hapus data
      this._service.deleteNoteById(id);

      // mengambalikan response sukses
      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    } catch (error) {
      // response error
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.status(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
