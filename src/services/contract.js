import React from 'react';
import web3 from 'web3';
import ABI from "./ABI"
const contractaddress = '0xc41eD1D2351A5A91e0cb17d0DD9CB8977E55308c';

const Government = '0x2c3b0e471c7E6C08ef8A30B69D9179A25b12BF11';

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
