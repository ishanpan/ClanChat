import { Fragment } from "react";
import { useSelector } from "react-redux";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Hello from "./Components/Hello";
import Name from "./Components/Name";
import Chat from "./Components/Chat";

function App() {
  let logg = useSelector((state) => state.auth.userInfo);
  return (
    <Fragment>
      <Chat />
    </Fragment>
  );
}
export default App;
