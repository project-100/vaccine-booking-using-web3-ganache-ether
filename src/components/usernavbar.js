import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import services from '../services/contract';
import '../../src/Style.css';
function Navbar(props) {
  const [accounts, setAccounts] = useState([]);
  const[Id,setID]=useState("");
    useEffect(async () => {
    let account = await services.getAccount();
    setAccounts(account);
    setID()
  }, []);
  return (
    <div className='nav' style={{ textAlign: 'right' }}>
      {props.navItems.map((value, index) => {
        if (value == 'home') {
          return (
            <Link
              className='button-2'
              key={index}
              to={'/' + value + '/' + accounts[1001 - 1001 + 10] + '/' + 1001}
            >
              {value}
            </Link>
          );
        }
        else if(value=="/"){
          return(
             <Link className='button-2' key={index} to={value}>
              front home
            </Link>
          )
        } else {
          return (
            <Link className='button-2' key={index} to={'/' + value}>
              {value}
            </Link>
          );
        }
      })}
    </div>
  );
}

export default Navbar;
