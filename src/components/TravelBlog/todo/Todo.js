import React from "react";
import tCss from "./todo.module.css";

function TodoItems({ number, header, body }) {
  return (
    <div className={tCss.todoList}>
      <div className={tCss.sn}>{number}</div>
      <div className={`${tCss.todoHeader}`}>{header}</div>
      <div className={tCss.todoBody}>{body}</div>
    </div>
  );
}

export default TodoItems;
