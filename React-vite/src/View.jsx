import React, { Component } from 'react';

export default class NotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: "",
      inputBody: "编辑笔记...",
    }
  }

  //添加note数据
  onNoteAdd = () => {
    this.props.onNoteAdd();
  }

  //选中note数据和删除note数据
  onNoteSelectAndDelete = (noteId) => {
    this.props.onNoteSelect(noteId);
    
    const doDelete = confirm("确认要删除该笔记吗?");
    if (doDelete) {
      this.props.onNoteDelete(noteId);
    }
  }

  // preview位置更新note数据
  onNoteEdit = () => {
      const {inputTitle, inputBody} = this.state;
      this.props.onNoteEdit(inputTitle, inputBody);
  }

  // 设置preview位置的note数据到state里
  inputValue = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value.trim()})
    }
  }

  //把选中的note数据更新到preview位置
  updateActiveNote = (node) => {
    this.setState({
        inputTitle: node.title,
        inputBody: node.body
    })
  }

  render() {
    const {inputTitle, inputBody} = this.state;
    return (
      <>
        <div className="notes__sidebar">
          <button className="notes__add" type="button" onClick={this.onNoteAdd}>添加新的笔记 📒</button>
          <div className="notes__list">
            {
              // 遍历所有note数据
              this.props.notes.map((note) => {
                return (
                  <div key={note.id} className="notes__list-item" onClick={() => this.onNoteSelectAndDelete(note.id)}>
                    <div className="notes__small-title">{note.title}</div>
                    <div className="notes__small-body">{note.body}</div>
                    <div className="notes__small-updated">{note.date}</div>
                  </div>)
              })
            }
          </div>
        </div>

        {/* 编辑修改note */}
        <div className="notes__preview">
            <input 
              className="notes__title" 
              type="text" 
              placeholder="新笔记..." 
              value={inputTitle} 
              onChange={this.inputValue('inputTitle')} 
              onBlur={this.onNoteEdit}
            />
            <textarea className="notes__body" value={inputBody} onChange={this.inputValue('inputBody')} onBlur={this.onNoteEdit}></textarea>
        </div>
      </>)
  }
}

