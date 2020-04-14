import React, { useState } from "react";
import axios from "axios";
import { api_domain } from "../configs.json";

import { toggleComplete } from "../actions/todosAction";

import Icon from "@mdi/react";
import { mdiWindowClose } from "@mdi/js";

import ScrollView from "./ScrollView/ScrollView";
import Flex from "./Flex/Flex";
import Text from "./Text/Text";
import Checkbox from "./Checkbox/Checkbox";
import Click from "./Click/Click";
import { connect } from "react-redux";

const TodoList = ({ todos, reload, toggleComplete }) => {
  const startTransitions = todos.map(() => ({
    transform: "translateX(0%)",
  }));
  const endTransition = { transform: "translateX(-100%)" };

  const [deleteAnimation, setDeleteAnimation] = useState(startTransitions);

  const onChecked = ({ _id, completed }) => {
    toggleComplete(_id);
    axios
      .patch(`${api_domain}todos/${_id}`, { completed: !completed })
      .then(() => reload())
      .catch((err) => alert(err));
  };

  const onDelete = (id, index) => {
    const newDeleteAnimation = [...deleteAnimation];
    newDeleteAnimation[index] = endTransition;
    setDeleteAnimation(newDeleteAnimation);

    axios
      .delete(`${api_domain}todos/${id}`)
      .then(() => {
        reload(() => {
          setDeleteAnimation(startTransitions);
        });
      })
      .catch((err) => alert(err));
  };

  const todosList = todos.map((todo, index) => (
    <Flex key={todo._id} align="center" style={deleteAnimation[index]}>
      <Flex>
        <Checkbox
          circle
          size="20"
          checked={todo.completed}
          handleClick={onChecked.bind(this, todo, index)}
        />
      </Flex>
      <Flex flex="1">
        <Text
          color={todo.completed ? "#7d807f" : ""}
          lineThrough={todo.completed}
        >
          {todo.title}
        </Text>
      </Flex>
      <Flex>
        <Click click={() => onDelete(todo._id, index)}>
          <Icon path={mdiWindowClose} size="16px" color="#f54169"></Icon>
        </Click>
      </Flex>
    </Flex>
  ));

  return <ScrollView height="300px">{todosList}</ScrollView>;
};

const mapStateToProps = (state, ownProps) => {
  const { todos } = state.todoReducer;

  return { todos, reload: ownProps.reload };
};

const mapDispatchToProps = { toggleComplete };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
