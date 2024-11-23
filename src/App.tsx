import "./App.css";
import Layout from "./components/Layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Categories from "./containers/Categories/Categories.tsx";

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/categories`} element={<Categories />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Layout>
  </>
);

export default App;
