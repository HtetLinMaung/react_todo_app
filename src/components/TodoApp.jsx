import React, { useEffect } from "react";
import axios from "axios";

import { api_domain } from "../configs.json";

import { connect } from "react-redux";
import {
  fetchTodos,
  setTodoText,
  toggleComplete,
  toggleCompleteAll,
  toggleHideComplete,
  filterTodos,
} from "../actions/todosAction";

import Card from "./Card/Card";
import Flex from "./Flex/Flex";
import Text from "./Text/Text";
import Checkbox from "./Checkbox/Checkbox";
import Textfield from "./Textfield/Textfield";
import SwitchControl from "./SwitchControl/SwitchControl";

import TodoList from "./TodoList";

const TodoApp = ({
  fetchTodos,
  addTodoText,
  setTodoText,
  completeAll,
  toggleCompleteAll,
  toggleHideComplete,
  hideComplete,
  filterTodos,
  title,
}) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const reload = (callback = () => {}) => {
    if (hideComplete) {
      fetchTodos("completed=false", callback);
    } else {
      fetchTodos("", callback);
    }
  };

  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      axios
        .post(`${api_domain}todos`, { title: addTodoText })
        .then(() => {
          reload();
          setTodoText("");
        })
        .catch((err) => alert(err));
    }
  };

  const onCompleteAll = (e) => {
    toggleCompleteAll();
    axios
      .patch(`${api_domain}todos/complete-all`, {
        completed: e.target.checked,
      })
      .then(() => reload())
      .catch((err) => alert(err));
  };

  const onSwitchHandle = (e) => {
    toggleHideComplete();
    if (e.target.checked) {
      fetchTodos("completed=false");
    } else {
      fetchTodos();
    }
  };

  return (
    <Card>
      <Text justify="center" title>
        {title}
      </Text>
      <Flex>
        <Flex flex="1"></Flex>
        <Flex>
          <SwitchControl
            checked={hideComplete}
            handleClick={onSwitchHandle}
            label="Hide Completed"
          />
        </Flex>
      </Flex>
      <Flex align="center">
        <Flex>
          <Checkbox
            size="20"
            label="Complete All"
            checked={completeAll}
            handleClick={onCompleteAll}
          />
        </Flex>
        <Flex flex={1}>
          <Textfield
            value={addTodoText}
            handleInput={(e) => {
              setTodoText(e.target.value);
              filterTodos(e.target.value);
            }}
            handleKeyPress={onPressEnter}
            rounded
            placeholder="Search Or Add Todos here..."
            height="40px"
          />
        </Flex>
      </Flex>
      <TodoList reload={reload} />
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { todos, addTodoText, completeAll, hideComplete } = state.todoReducer;
  return {
    todos,
    addTodoText,
    completeAll,
    hideComplete,
    title: ownProps.title,
  };
};

const mapDispatchToProps = {
  fetchTodos,
  setTodoText,
  toggleComplete,
  toggleCompleteAll,
  toggleHideComplete,
  filterTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
