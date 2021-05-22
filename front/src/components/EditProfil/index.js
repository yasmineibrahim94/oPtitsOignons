import React from 'react';

// composants import
import Header from '../Header';
import Footer from '../Footer';
import ValidButton from '../ValidButton';
import UploadPic from '../UploadPic';

// style import
import './style.scss';

const EditProfil = () => (
  <div className="EditProfil_Container">
    <Header />
    <div className="EditProfil_main formMy">
      <div className="pageContainer">
        <div className="EditProfil_page1 page1">
          <h1 className="form_Title">Modifier mon profil</h1>
          <input type="text" className="inputForm" id="pseudo" name="pseudo" placeholder="Pseudo" required />
          <input type="password" className="inputForm" id="password" name="password" placeholder="Mot de passe" required />
          <input type="password" className="inputForm" id="password" name="password" placeholder="Confirmer le mot de passe" required />
          <input type="text" className="inputForm" id="name" name="name" placeholder="Prénom" required />
          <input type="text" className="inputForm" id="lastname" name="lastname" placeholder="Nom" required />
        </div>
        <div className="page2">
          <h1 className="form_Title">Mes Allergies</h1>
          <input type="checkbox" className="inputCheck" id="allergy.id" name="allergy.name" />
          <UploadPic />
          <ValidButton className="valid" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default EditProfil;
