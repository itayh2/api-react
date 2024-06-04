import "./App.css";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import UpdateUser from "./components/UpdateUser";
import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <h1>My Users App</h1>
      <UserList />
      {/* Example of using other components with specific IDs */}
      <UserDetails bookId={2} />
      <AddUser />
      <UpdateUser bookId={1} />
      <DeleteUser bookId={1} />
    </div>
  );
}

export default App;
