import Protected from "./components/Protected";
import useAuth from "./hooks/useAuth";
import Admin from "./components/Admin";

function App() {
  const [isLogin, token] = useAuth();
  console.log ("check is logged in: ", isLogin)
  console.log(token)
  return isLogin ? <Protected token={token} /> : <Admin />;
  
}

export default App;