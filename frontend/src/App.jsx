import Protected from "./components/Protected";
import useAuth from "./hooks/useAuth";
import Admin from "./components/admin";

function App() {
  const [isLogin, token] = useAuth();
  return isLogin ? <Protected token={token} /> : <Admin />;
  
}

export default App;