export default class NotesAPI {

  //从local storage拿所有的note数据
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    //获取preview位置对应的note数据
    const existing = notes.find((note) => note.id === noteToSave.id);

    // Edit/Update
    if (existing) {
      //应用preview位置修改的note数据
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    // const notes = []; 手动设置空数据到local storage
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);
    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
