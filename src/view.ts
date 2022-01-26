export default class NotesView {
  public root:any;
  public onNoteSelect:any;
  public onNoteAdd:any;
  public onNoteEdit:any;
  public onNoteDelete:any;

  constructor(
    root:any,
    // Sheldon - no sure how to define data type
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete }={}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
          <div class="notes__sidebar">
              <button class="notes__add" type="button">添加新的笔记 📒</button>
              <div class="notes__list"></div>
          </div>
          <div class="notes__preview">
              <input class="notes__title" type="text" placeholder="新笔记...">
              <textarea class="notes__body">编辑笔记...</textarea>
          </div>
      `;
    const btnAddNote = this.root.querySelector(".notes__add");//点击按钮
    const inpTitle = this.root.querySelector(".notes__title");
    const inpBody = this.root.querySelector(".notes__body");
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });
    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });
    this.updateNotePreviewVisibility(false);
  }
  //构造方法end

  _createListItemHTML(id:number, title:string, body:string, updated:any) {
    const MAX_BODY_LENGTH = 60;
    return `
          <div class="notes__list-item" data-note-id="${id}">
              <div class="notes__small-title">${title}</div>
              <div class="notes__small-body">
                  ${body.substring(0, MAX_BODY_LENGTH)}
                  ${body.length > MAX_BODY_LENGTH ? "..." : ""}
              </div>
              <div class="notes__small-updated">
                  ${updated.toLocaleString(undefined, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
              </div>
          </div>
      `;
  }

  updateNoteList(notes:any) {
    const notesListContainer = this.root.querySelector(".notes__list");
    // Empty list
    notesListContainer.innerHTML = "";
    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select/delete events for each list item
    notesListContainer
      .querySelectorAll(".notes__list-item")
      .forEach((noteListItem:any) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        // Sheldon fix bug - dblclick is error
        noteListItem.addEventListener("click", () => {
        //===============Sheldon end==================
          const doDelete = confirm("确认要删除该笔记吗?");

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note:any) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;
    this.root.querySelectorAll(".notes__list-item").forEach((noteListItem:any) => {
      noteListItem.classList.remove("notes__list-item--selected");
    });
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible:boolean) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
