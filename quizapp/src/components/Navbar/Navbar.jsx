import React from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{backgroundColor: '#e3f2fd'}} >
    <div className="container-fluid">
      <a className="navbar-brand" href="/" style={{color:"green", fontWeight: "bolder"}} >Mirafra Technologies</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/"> Questions and Answers</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-danger fw-bolder" href="/add-question">Add Questions</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar