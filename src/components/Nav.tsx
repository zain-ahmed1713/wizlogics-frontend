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
                src={user?.profilePicture}
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
            <Dropdown.Item>Profile</Dropdown.Item>
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
        ""
      )}
    </Navbar>
  );
}
