import React from 'react';
import web3 from 'web3';
import ABI from './ABI';
const contractaddress = '0xE51ef1055bf842423772005E5Ca19E097BEdD556';

const Government = '0xefe76a274d4BB9088ddDdcF51d2Aa69Ba1F7d288';

let Accounts;
let Web3 = new web3('http://localhost:7545');

async function getAccount() {
  Accounts = await Web3.eth.getAccounts();
  return Accounts;
}

function getLocal() {
  let islogin = localStorage.getItem('vaccine_login');
  if (islogin == null) {
    window.location.href = 'http://localhost:3000/';
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
