import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NavAdmin = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="">
      <nav
        className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-6">
          <button
            className="block border-0 bg-transparent px-2.5 py-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            <a
              className="mr-2 mt-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
              href="#"
            >
              <img
                src="https://tecdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
                style={{ height: "15px" }}
                alt=""
                loading="lazy"
              />
            </a>
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref
            >
              <li className="lg:pr-2" data-te-nav-item-ref>
                <Link
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  to="/admin/dashboard"
                  data-te-nav-link-ref
                >
                  Dashboard
                </Link>
              </li>
              <li className="lg:pr-2" data-te-nav-item-ref>
                <Link
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  data-te-nav-link-ref
                  to="/admin/dashboard/products"
                >
                  Products
                </Link>
              </li>
              <li className="lg:pr-2" data-te-nav-item-ref>
                <Link
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  to="/admin/dashboard/categories"
                  data-te-nav-link-ref
                >
                  Categories
                </Link>
              </li>
              <li className="lg:pr-2" data-te-nav-item-ref>
                <Link
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  to="/admin/dashboard/orders"
                  data-te-nav-link-ref
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative flex items-center">
            <div className="relative" data-te-dropdown-ref>
              <div>Xin chào {user && JSON.parse(user).user.name}</div>
              <button
                className="border my-1 p-3 hover:bg-slate-500 hover:text-white rounded-md "
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavAdmin;
