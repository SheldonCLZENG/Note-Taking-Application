import React, { Component } from 'react';
// import {nanoid} from 'nanoid'

import NotesView from "./View";
import NotesAPI from "./api.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      activeNote: {},//选中的note
    };
  }

  componentDidMount () {
    this._refreshNotes();
  }

  //刷新note数据
  _refreshNotes = () => {
    const notes = NotesAPI.getAllNotes();
    this.setState({notes});
  }

  //选中的note数据
  _setActiveNote = (note) => {
    this.setState({ activeNote: note })
    // 更新选中的note数据到preview位置
    this.NotesView.updateActiveNote(note);
  }

  //添加note数据
  onNoteAdd = () => {
    const newNote = {
      // id: nanoid(),
      title: "新建笔记",
      body: "开始记录...",
      date: new Date().toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            })
    };
    NotesAPI.saveNote(newNote);
    this._refreshNotes();
  }

  // 选中的note数据
  onNoteSelect = (noteId) => {
    const selectedNote = this.state.notes.find((note) => note.id === noteId * 1);
    this._setActiveNote(selectedNote);
  }

  //删除选中的note数据
  onNoteDelete = (noteId) => {
    NotesAPI.deleteNote(noteId);
    this._refreshNotes();
  }

  //应用preview位置修改的note数据
  onNoteEdit = (title, body) => {
    NotesAPI.saveNote({
      id: this.state.activeNote.id,
      title,
      body,
      date: new Date().toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            })
    });
    this._refreshNotes();
  }

  render() {
    return (
      <NotesView 
        activeNote={this.state.activeNote} 
        onNoteAdd={this.onNoteAdd} 
        onNoteSelect={this.onNoteSelect} 
        onNoteDelete={this.onNoteDelete} 
        onNoteEdit={this.onNoteEdit} 
        notes={this.state.notes} 
        ref={NotesView => this.NotesView = NotesView}
      />
    )
  }
}
