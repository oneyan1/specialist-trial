import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import SpecialistsPage from "../../pages/SpecialistsPage";
import FavoritesPage from "../../pages/FavoritesPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SpecialistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
