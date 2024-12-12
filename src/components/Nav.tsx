import { Button, Dropdown, Navbar } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export function Nav() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar fluid rounded className="w-full">
      <Navbar.Brand href={user?.role === "admin" ? "/admin-panel" : "/home"}>
        <span className="self-center whitespace-nowrap text-xl font-semibold tracking-wider dark:text-white">
          {user?.role === "admin" ? "WizLogics Admin" : "Wizlogics"}
        </span>
      </Navbar.Brand>
      {user ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <img
                src={
                  user?.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                className="w-10 h-10 object-cover rounded-full"
              ></img>
              //   <Avatar
              //     alt="User settings"
              //     img={user?.profilePicture}
              //     rounded
              //     className="w-10 h-10 object-scale-down"
              //   />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">
                @{user?.username}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              onClick={() => navigate(`/profile/${user?.username}`)}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/enrolled-courses")}>
              Enrolled Courses
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/flashcard-attempts")}>
              Flashcard Attempts
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/leaderboard")}>
              Leaderboard
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <div className="flex gap-3">
          <Button color="success" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
          <Button color="blue" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </div>
      )}
      {user?.role === "admin" ? (
        <Navbar.Collapse>
          <Navbar.Link
            onClick={() => navigate("/admin-panel")}
            active={location.pathname === "/admin-panel"}
            className="cursor-pointer"
          >
            Users
          </Navbar.Link>
          <Navbar.Link
            onClick={() => navigate("/admin-courses")}
            active={location.pathname === "/admin-courses"}
            className="cursor-pointer"
          >
            Courses
          </Navbar.Link>
          <Navbar.Link
            onClick={() => navigate("/admin-decks")}
            active={location.pathname === "/admin-decks"}
            className="cursor-pointer"
          >
            Flashcard Decks
          </Navbar.Link>
          {/* <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
        </Navbar.Collapse>
      ) : (
        user && (
          <Navbar.Collapse>
            <Navbar.Link
              onClick={() => navigate("/feed")}
              active={location.pathname === "/feed"}
              className="cursor-pointer"
            >
              Feed
            </Navbar.Link>
            <Navbar.Link
              onClick={() => navigate("/courses")}
              active={/\/courses(\/.*)?$/.test(location.pathname)}
              className="cursor-pointer"
            >
              Courses
            </Navbar.Link>
            <Navbar.Link
              onClick={() => navigate("/flashcard-decks")}
              active={/\/flashcard-decks(\/.*)?$/.test(location.pathname)}
              className="cursor-pointer"
            >
              Flashcard Decks
            </Navbar.Link>
            <Navbar.Link
              onClick={() => navigate("/code")}
              active={location.pathname === "/code"}
              className="cursor-pointer"
            >
              Code Playground
            </Navbar.Link>
            <Navbar.Link
              onClick={() => navigate("/ask-ai")}
              active={location.pathname === "/ask-ai"}
              className="cursor-pointer"
            >
              Ask AI
            </Navbar.Link>
            {/* <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
          </Navbar.Collapse>
        )
      )}
    </Navbar>
  );
}
