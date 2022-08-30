import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ArtistCreate from "./components/artists/ArtistCreate";
import ArtistMain from "./components/artists/ArtistMain";
import ArtistDetail from "./components/artists/ArtistsDetail";
import ArtistEdit from "./components/artists/ArtistEdit";
import Header from "./components/Header.component";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArtistMain />}></Route>
        <Route path="artists/:id" element={<ArtistDetail />} />
        <Route path="artists/new" element={<ArtistCreate />} />
        <Route path="artists/:id/edit" element={<ArtistEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
