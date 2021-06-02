import React from 'react';
import web3 from 'web3';
import ABI from "./ABI"
const contractaddress = '0x7cF7e47F7DFa1aeF32e83cDe34d036D975d5B4f2';

const Government = '0x0C6004fE657fEBf22850AdbA02C7C59D05d2a6fE';

let Accounts;
let Web3 = new web3('http://localhost:7545');

async function getAccount() {
  Accounts = await Web3.eth.getAccounts();
  return Accounts;
}

function getLocal() {
  let islogin = localStorage.getItem('vaccine_login');
  if(islogin==null){
    window.location.href="http://localhost:3000/"
  }
  return islogin;
}

let API = new Web3.eth.Contract(ABI, contractaddress);
export default {
  Government,
  API,
  getAccount,
  getLocal,
};
