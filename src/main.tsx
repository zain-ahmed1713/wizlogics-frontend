import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Form from "./components/Form";
import NotFound from "./components/NotFound.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminHome from "./pages/Admin/Admin-Home/AdminHome.tsx";
import AdminCourses from "./pages/Admin/Admin-Courses/AdminCourses.tsx";
import CreateCourse from "./pages/Admin/Admin-Courses/Create-Course/CreateCourse.tsx";
import ShowCourse from "./pages/Admin/Admin-Courses/Show-Course/ShowCourse.tsx";
import ShowModule from "./pages/Admin/Admin-Courses/Show-Module/ShowModule.tsx";
import CreateModule from "./pages/Admin/Admin-Courses/Create-Module/CreateModule.tsx";
import Decks from "./pages/Admin/Admin-Flashcard-Decks/Decks.tsx";
import CreateDeck from "./pages/Admin/Admin-Flashcard-Decks/Create-Deck/CreateDeck.tsx";
import ShowDeck from "./pages/Admin/Admin-Flashcard-Decks/Show-Deck/ShowDeck.tsx";
import CreateFlashcard from "./pages/Admin/Admin-Flashcard-Decks/Create-Flashcard/CreateFlashcard.tsx";
import ShowFlashcard from "./pages/Admin/Admin-Flashcard-Decks/Show-Flashcard/ShowFlashcard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signup" element={<Form mode="SIGNUP" />} />
      <Route path="/verify/:username" element={<Form mode="VERIFY" />} />
      <Route path="/login" element={<Form mode="LOGIN" />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-panel" element={<AdminHome />} />
        <Route path="/admin-courses" element={<AdminCourses />} />
        <Route path="/admin-courses/:courseId" element={<ShowCourse />} />
        <Route path="/admin-create-course" element={<CreateCourse />} />
        <Route path="/admin-modules/:moduleId" element={<ShowModule />} />
        <Route
          path="/admin-courses/:courseId/modules/create-module"
          element={<CreateModule />}
        />
        <Route path="/admin-decks" element={<Decks />} />
        <Route path="/admin-decks/:deckId" element={<ShowDeck />} />
        <Route
          path="/admin-decks/:deckId/flashcard/create"
          element={<CreateFlashcard />}
        />
        <Route path="/admin-create-deck" element={<CreateDeck />} />
        <Route
          path="/admin-flashcard/:flashcardId"
          element={<ShowFlashcard />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
