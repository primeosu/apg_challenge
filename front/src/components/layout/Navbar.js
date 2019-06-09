import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

class Navbar extends Component {

  render() {
    const NavigationNonAuth = () => (
      <nav className='navbar navbar-expand-lg py-2'>
        <div className='container'>
          <Link style={{textDecoration: 'none'}} to='/searchschools'>
          <img className='rounded-circle avatar-image--icon' src={require("../../img/apg.png")} alt='Logo' />
            <b className='ml-3'>APG</b>
          </Link>
        </div>
      </nav>
    );

    return (
      <Nav id='app-navbar' className='doggo-nav'>
        <NavigationNonAuth />
      </Nav>
    );
  }
}
export default Navbar;
