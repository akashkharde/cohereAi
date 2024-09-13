import { Route, Routes } from "react-router-dom";
import Chat from "./pages/chat";
import "./App.css";
import Welcome from "./pages/welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}

export default App;
