import React from 'react';
import './style.scss';



const UploadPic = () => (
  
  <div className="upload">
        <label for="mypic" className="myPic">Ajouter ma photo</label>
  <input type="file"className="uploadPic"></input>
  </div>
);

export default UploadPic;
