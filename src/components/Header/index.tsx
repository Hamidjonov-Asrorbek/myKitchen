import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../darkModeSlice";

type RootState = {
  cart: {
    products: Product[];
  };
  darkMode: boolean;
};

type Product = {
  id: string;
  price: number;
  title: string;
  description: string;
  images: string[];
  ingredients: string[];
  time: number;
};

type User = {
  photoURL?: string;
  displayName?: string;
  email?: string;
};
type CartState = {
  products: Product[];
};

function Header() {
  const navigate = useNavigate();
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const products = useSelector((state: RootState) => state.cart.products);
  const cart = useSelector((state: RootState) => state.cart) as CartState;
  // console.log(cart);
  const dispatch = useDispatch();
  // const [refresh] = useState(false);
  // const { data } = useGetData("cart", refresh);
  const [total, setTotal] = useState<number>(0);
  const user = auth.currentUser?.providerData[0] as User | undefined;
  // console.log(user);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("darkmode") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("darkmode", theme);
  }, [theme]);

  const handleToggleDarkMode = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    dispatch(toggleDarkMode());
  };

  const handleLogOut = (): void => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.setItem("user", "null");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  useEffect(() => {
    setTotal(cart.products.reduce((acc, product) => acc + product.price, 0));
  }, [products]);

  return (
    <header className="navbar bg-base-300">
      <div className="container navbar">
        <div className="navbar-start">
          <div className="dropdown w-fit">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle w-fit p-2"
            >
              <Link to="/">My Kitchen</Link>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Products</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/productadd">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/statistic">Statistic</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center pages hidden sm:block">
          <NavLink to="/" className="nav__link btn btn-ghost text-xl">
            Products
          </NavLink>
          <NavLink to="/productadd" className="nav__link btn btn-ghost text-xl">
            Add Product
          </NavLink>
          <NavLink to="/cart" className="nav__link btn btn-ghost text-xl">
            Cart
          </NavLink>
          <NavLink to="/statistic" className="nav__link btn btn-ghost text-xl">
            Statistic
          </NavLink>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleToggleDarkMode}
              checked={darkMode}
            />
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="rounded-full"
                  width={30}
                  height={30}
                />
              )}
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[100] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  <p>{user?.displayName}</p>
                </span>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="indicator">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm badge-primary indicator-item">
                    {products?.length ?? 0}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[100] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {products?.length ?? 0} Items
                  </span>
                  <span className="text-info">Subtotal: ${total}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      <NavLink to="/cart">View cart</NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
