class NotesHandler {
  constructor(service) {
    this._service = sevice;
  }

  // method postNoteHandler
  postNoteHandler() {
    try {
      const { title = "untitled", body, tags } = request.payload;

      const noteId = this._service.addNote({ title, body, tags });

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

  getNoteByIdHandler() {}

  putNoteByIdHandler() {}

  deleteNoteByIdHandler() {}
}
