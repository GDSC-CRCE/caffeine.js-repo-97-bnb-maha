import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Home from "./pages/Home";
import Create from "./pages/Create";
import CreateForm from "./pages/CreateForm";
import TextEditor from "./components/TextEditor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create/createForm" element={<CreateForm />} />
      <Route path="/create/textEditor" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}