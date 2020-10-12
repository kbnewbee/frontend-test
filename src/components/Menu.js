const Menu = [
  {
    label: "Home",
    pathname: "/tinyurl",
    showWhenLogged: true,
    show: true,
    admin: true,
  },
  {
    label: "Dashboard",
    pathname: "/dashboard",
    showWhenLogged: false,
    show: false,
    admin: true,
  },
  {
    label: "Sign In",
    pathname: "/signin",
    showWhenLogged: false,
    show: true,
    admin: false,
  },
  {
    label: "Signup",
    pathname: "/signup",
    showWhenLogged: false,
    show: true,
    admin: false,
  },
  {
    label: "Profile",
    pathname: "/profile",
    showWhenLogged: true,
    show: false,
    admin: true,
  },
  // {
  //   label: "TinyUrl",
  //   pathname: "/tinyurl",
  //   showWhenLogged: true,
  //   show:true
  // },
  {
    label: "Github",
    pathname: "https://github.com/alexanmtz/material-sense",
    external: true,
  },
];

export default Menu;
