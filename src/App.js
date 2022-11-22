import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "styles/global.scss";
import { useDispatch } from "react-redux";
import AppRouter from "./Routes/AppRouter";
import { setUser } from "store/reducers/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
    return () => onUser();
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
