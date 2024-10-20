import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Home from "./pages/Home";
import Create from "./pages/Create";
import CreateForm from "./pages/CreateForm";
import TextEditor from "./components/TextEditor";
import DocView from "./pages/DocumentView";
import DocumentUpload from "./pages/DocumentUpload";
import PDFSigner from "./pages/PDFSigner";
import Upload from "./pages/Upload";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/docview" element={<DocView />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create/createForm" element={<CreateForm />} />
        <Route path="/create/textEditor" element={<TextEditor />} />
        <Route path="/documentUpload" element={<DocumentUpload/>}/>
        <Route path="/pdfsigner" element={<PDFSigner />}/>
        <Route path="/upload" element={<Upload />}/>
      </Routes>
    </BrowserRouter>
  );
}


