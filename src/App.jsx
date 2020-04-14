import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import Center from "./components/Center/Center";
import TodoApp from "./components/TodoApp";
import Container from "./components/Container/Container";

const App = () => (
  <Provider store={store}>
    <Container color="#f9fbfc">
      <Center>
        <TodoApp title="Todo App" />
      </Center>
    </Container>
  </Provider>
);

export default App;
