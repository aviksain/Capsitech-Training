import { Header, Body, AuthContainer } from "./Components/index.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, SignUp, Login, TodoPage } from "./Pages/index.js";
import Layout from "./Layout";
import { useEffect } from "react";
import { useTodo } from "./Context/TodoContext.jsx";
import { getCurrentUser } from "./api/users.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <AuthContainer authentication={false}>
            <Home />
          </AuthContainer>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthContainer authentication={false}>
            <SignUp />
          </AuthContainer>
        }
      />
      <Route
        path="/login"
        element={
          <AuthContainer authentication={false}>
            <Login />
          </AuthContainer>
        }
      />
      <Route
        path="/todos"
        element={
          <AuthContainer authentication={true}>
            <TodoPage />
          </AuthContainer>
        }
      />
    </Route>
  )
);

function App() {
  const { saveUser, removeUser } = useTodo();

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        if (response.data) {
          saveUser(response.data);
        } 
        else {
          removeUser();
        }
      });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
