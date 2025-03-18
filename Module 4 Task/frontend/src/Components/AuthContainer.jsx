import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodo } from '../Context/TodoContext.jsx';

function AuthContainer({ children, authentication = true }) {
  const navigate = useNavigate();
  const { authStatus } = useTodo();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication === true && authStatus === false) {
      navigate("/login");
    } else if (authentication === false && authStatus === true) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthContainer