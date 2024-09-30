import React from 'react';

const Nav = ({ activeTab, selectTab }) => {

  const navColor = {
    backgroundColor: '#8d3b50',
    color: 'white',
  };

  const activeStyle = {
    ...navColor,
    color: 'white',
    borderRadius: '7px', // Ensure the text color is white for active tab
  };

  return (
    <div>
      <h2 className='text-center mt-2'>Your Orders</h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent container">
        <ul className="navbar-nav mr-auto">
          <li 
            className=  {`nav-item ${activeTab === 'stationaryTable' ? 'active' : ''}`}
            style={activeTab === 'stationaryTable' ? activeStyle : {}}
          >
            <a
              className="nav-link"
              href="#stationaryTable"
              onClick={(e) => selectTab(e, 'stationaryTable')}
              style={{ color: activeTab === 'stationaryTable' ? 'white' : 'inherit' }} // Change text color based on active tab
            >
              <span style={{border:"4px solid #8d3b50",borderRadius:"5px"}} className="fw-bold p-1">Stationary</span>
            </a>
          </li>
          <li
            className={`nav-item ${activeTab === 'cosmeticsTable' ? 'active' : ''}`}
            style={activeTab === 'cosmeticsTable' ? activeStyle : {}}
          >
            <a
              className="nav-link"
              href="#cosmeticsTable"
              onClick={(e) => selectTab(e, 'cosmeticsTable')}
              style={{ color: activeTab === 'cosmeticsTable' ? 'white' : 'inherit' }} // Change text color based on active tab
            >
              <span style={{border:"4px solid #8d3b50",borderRadius:"5px"}}  className="fw-bold p-1">Cosmetics</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
