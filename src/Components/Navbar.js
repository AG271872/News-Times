import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const searchNews = () => {
    console.log(searchQuery)
    navigate(`/search/${searchQuery}`)
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{backgroundColor: '#000203'}}>
      <div className="container-fluid">
        <Link className="navbar-brand text-info fw-bold" to="/">News Times</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-info" aria-current="page" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/business">Business </Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/technology">Technology</Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link text-info" to="/entertainment">Entertainment</Link></li>
          </ul>
          <form className="d-flex" role="search" onSubmit={() => searchNews()}>
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-info" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
