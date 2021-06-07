import React from "react";

const Index = () => {
  return (
    <div className="container index">
      <div className="row mt-5">
        <div className="col-md-12">
            <h1 className="text-center">NotesApp</h1>
            <h5 className="text-center mt-5"> Con el fín de poner en práctica los conocimientos que fuí adquiriendo en este tiempo como estudiante de programación web,<br/>
            desarrollé esta App con la funcionalidad de crear y eliminar NOTAS, registro de usuarios, Login y Logout.<br/>
            </h5>
            <h2 className="text-center mt-5">Tecnologias</h2>
            <dl className="text-center mt-2">
                <dt className="mt-2"><b>Front-end:</b></dt>
                <dd>React.js - Hooks(useState , useEffect, useReducer) - ContextApi - Bootstrap</dd>
                <dt className="mt-2"><b>Back-end:</b></dt>
                <dd>Node.js - MongoDB - Json Web Token</dd>
            </dl>
            <p className="author text-end">Gustavo Romero</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
