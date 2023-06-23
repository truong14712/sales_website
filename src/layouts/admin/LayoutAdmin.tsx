import { Outlet, json, useNavigate } from "react-router";
import Nav from "../../components/Nav";
import NavAdmin from "../../components/NavAdmin";
const LayoutAdmin = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  return (
    <div>
      {user && JSON.parse(user).user.role === "admin" ? (
        <>
          <NavAdmin />
          <Outlet />
        </>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default LayoutAdmin;
