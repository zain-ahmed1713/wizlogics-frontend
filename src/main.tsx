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
import ShowCoursesToUsers from "./pages/Users/User-Courses/Show-Courses/ShowCoursesToUsers.tsx";
import UserProtectedRoutes from "./components/UserProtectedRoutes.tsx";
import ShowCourseDetails from "./pages/Users/User-Courses/Show-Course-Details/ShowCourseDetails.tsx";
import ShowFlashcardDecks from "./pages/Users/User-Courses/Show-Flashcard-Decks/ShowFlashcardDecks.tsx";
import ShowFlashcards from "./pages/Users/User-Courses/Show-Flashcards/ShowFlashcards.tsx";
import ShowEnrolledCourses from "./pages/Users/User-Courses/Show-Enrolled-Courses/ShowEnrolledCourses.tsx";
import ShowCourseModules from "./pages/Users/User-Courses/Show-Course-Modules/ShowCourseModules.tsx";
import ShowModules from "./pages/Users/User-Courses/Show-Modules/ShowModules.tsx";
import ShowFlashcardAttempts from "./pages/Users/User-Courses/Show-Flashcard-Attempts/ShowFlashcardAttempts.tsx";
import Feed from "./pages/Users/Feed/Feed.tsx";
import AskAI from "./pages/Ask-AI/AskAI.tsx";
import CodePlayground from "./pages/Code-Playground/CodePlayground.tsx";
import Profile from "./pages/Users/Profile/Profile.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.tsx";
import Home from "./pages/Home/Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/home" element={<Home />} />
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
      <Route element={<UserProtectedRoutes />}>
        <Route path="/courses" element={<ShowCoursesToUsers />} />
        <Route path="/courses/:courseId" element={<ShowCourseDetails />} />
        <Route path="/flashcard-decks" element={<ShowFlashcardDecks />} />
        <Route path="/flashcard-decks/:deckId" element={<ShowFlashcards />} />
        <Route path="/enrolled-courses" element={<ShowEnrolledCourses />} />
        <Route
          path="/enrolled-courses/:courseId"
          element={<ShowCourseModules />}
        />
        <Route path="/module/:moduleId" element={<ShowModules />} />
        <Route path="/flashcard-attempts" element={<ShowFlashcardAttempts />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/code" element={<CodePlayground />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
      <Route path="/profile/:username" element={<Profile />} />
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
