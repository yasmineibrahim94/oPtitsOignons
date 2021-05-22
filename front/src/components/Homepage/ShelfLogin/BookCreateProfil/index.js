import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const BookCreateProfil = () => (
  <div className="createProfilBookContainer">
    <Link
      to="/create-profil"
      className="createProfilBook createProfilBook-text"
      type="button"
    >
      S'inscrire
    </Link>
  </div>
);

export default BookCreateProfil;
