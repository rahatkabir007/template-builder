import MainRoutes from "./components/Routes/MainRoutes";
import { BrowserRouter as Router } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <MainRoutes />
      </Router>
    </>
  );
}

export default App;
