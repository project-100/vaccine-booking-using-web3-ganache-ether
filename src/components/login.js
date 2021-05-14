import React, { useState, useEffect } from 'react';
import services from '../services/contract';
import Nav from '../components/usernavbar';

function Login() {
  const [Id, setId] = useState();
  const [pass, setpass] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(async () => {
    let accounts = await services.getAccount();
    console.log(accounts);
    setAccounts(accounts);
  }, []);

  async function Submit() {
    let Api = services.API;
    let islogin = await Api.methods.checklogin(Id, pass).call();
    console.log(islogin);
    if (islogin) {
      let num = Id - 1001 + 10;
      localStorage.setItem('vaccine_login', Id);

      window.location.href += `home/` + accounts[num] + '/' + Id;
    }
  }

  return (
    <>
      <Nav navItems={[]} />
      <div className='container'>
        <form className='formcontainer' onSubmit={(e) => e.preventDefault()}>
          <div className='msg'>LOGIN</div>
          <input
            type='number'
            placeholder='ID'
            className='input-box margin-10'
            min='1001'
            onChange={(e) => {
              setId(e.target.value);
            }}
          />

          <input
            type='password'
            placeholder='PASSWORD'
            className='input-box'
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <br />
          <input
            type='submit'
            value='LOGIN'
            className='button-1'
            onClick={Submit}
          />
        </form>
      </div>
    </>
  );
}
export default Login;
