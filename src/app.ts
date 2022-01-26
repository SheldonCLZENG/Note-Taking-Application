import NotesView from "./view";
import NotesAPI from "./api";

export default class App {
  public notes:any[];
  public activeNote: any;
  public view: any;

  constructor(root:any) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes:any[]) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note: {}) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteSelect: (noteId:string) => {
        // Sheldon fix bug - noteId is string type, need transfer noteId to number type
        const noteIdNumber = parseInt(noteId);

        // const selectedNote = this.notes.find((note) => note.id === noteId);
        const selectedNote = this.notes.find((note) => note.id === noteIdNumber);
        //===============Sheldon end==================

        this._setActiveNote(selectedNote);
      },
      onNoteAdd: () => {
        const newNote = {
          title: "新建笔记",
          body: "开始记录...",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title:string, body:string) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title,
          body,
        });
        this._refreshNotes();
      },
      onNoteDelete: (noteId:number) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
