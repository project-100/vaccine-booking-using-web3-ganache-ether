import React, { useEffect, useState } from 'react';
import services from '../services/contract';
import '../../src/Style.css';
import Nav from '../components/usernavbar';

function Home() {
  const [pass, setpass] = useState('');
  const [Accounts, setAccounts] = useState([]);
  const [id, setId] = useState('');

  useEffect(async () => {
    let accounts = await services.getAccount();
    console.log(accounts);
    setAccounts(accounts);
  }, []);
  async function Submit() {
    let Api = services.API;
    let getAddress = await Api.methods.getaddressindex().call();

    try {
      let reg = await Api.methods
        .register(Accounts[getAddress], pass)
        .send({ from: Accounts[getAddress], gas: 1000000 });
      let userid = await Api.methods.getLogin(Accounts[getAddress]).call();
      setId(userid);
    } catch (e) {
      let error = String(e);
      console.log(error.split(':'));
    }
  }

  return (
    <>
      <Nav navItems={[]} />
      <div className='container'>
        <form className='formcontainer' onSubmit={(e) => e.preventDefault()}>
          <div className='msg'>generate your id with new password</div>

          <input
            type='password'
            placeholder='PASSWORD'
            className='input-box margin-10'
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <br />
          <input
            type='submit'
            value='register'
            className='button-1'
            onClick={Submit}
          />
          <h1>your id is:{id}</h1>
        </form>
      </div>
    </>
  );
}
export default Home;
