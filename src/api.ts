export default class NotesAPI {
  static getAllNotes() {
    //数组，放所有笔记数据
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    return notes.sort((a:{updated:string}, b:{updated:string}) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave:{id?:number, title?:string, body?:string, updated?:any}) {
    const notes = NotesAPI.getAllNotes();
    const existing = notes.find((note:{id:number}) => note.id === noteToSave.id);

    // Edit/Update
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id:number) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note:any) => note.id != id);
    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
