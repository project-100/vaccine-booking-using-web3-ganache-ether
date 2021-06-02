import React, { useEffect, useState } from 'react';
import services from '../services/contract';
import '../../src/Style.css';
import Nav from '../components/usernavbar';

function Home() {
  const [pass, setpass] = useState('');
  const [Accounts, setAccounts] = useState([]);
  const [ispass,setispass] =useState(false);
  const [id, setId] = useState('');

  useEffect(async () => {
    let accounts = await services.getAccount();
    console.log(accounts);
    setAccounts(accounts);
  }, []);
  async function Submit() {
    let Api = services.API;
    if(pass===""){
      alert("password should not empty")
     return;
    }
    let getAddress = await Api.methods.getaddressindex().call();
    console.log(getAddress);
    

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
      <Nav navItems={["/"]} />
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
            <input
            type='password'
            placeholder='ConfirmPASSWORD'
            className='input-box margin-10'
            onChange={(e) => {
              if(pass=== e.target.value){
                  setispass(true)
              }
              else{
                setispass(false)
              }
              
            }}
          />
          <br />
          <input
            type='submit'
            value='register'
            className='button-1'
            disabled={!ispass}
            onClick={Submit}
          />
          <h1>your id is:{id}</h1>
        </form>
      </div>
    </>
  );
}
export default Home;
