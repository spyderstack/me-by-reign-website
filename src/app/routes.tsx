import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { OurStory } from "./pages/OurStory";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "our-story", Component: OurStory },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
    ],
  },
]);
