import React from 'react';
import web3 from 'web3';
const contractaddress = '0x1674CDCFf566D633c4278307a66155408a1942Bb';

const Government = '0x8Ac7125726345c959F6974c871556Ae48f776615';

let Accounts;
let Web3 = new web3('http://localhost:7545');
let ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'datetime',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_center',
        type: 'string',
      },
    ],
    name: 'bookvaccine',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'cancelvaccine',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getaddressindex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_staff',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_password',
        type: 'string',
      },
    ],
    name: 'recruitstaff',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_peopleid',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'vaccineshoted',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_password',
        type: 'string',
      },
    ],
    name: 'checklogin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getBookingdetails',
    outputs: [
      {
        internalType: 'uint256',
        name: 'booked',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'appoinment',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'datetime',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_peopleid',
        type: 'address',
      },
    ],
    name: 'getLogin',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_datetime',
        type: 'string',
      },
    ],
    name: 'getVaccinationDetails',
    outputs: [
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
      {
        internalType: 'uint256[3]',
        name: 'centercount',
        type: 'uint256[3]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'government',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'people',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'datetime',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'bookingtime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'visitingtime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gotvaccine',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'secret',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'showstaff',
    outputs: [
      {
        internalType: 'address',
        name: 'staff',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_password',
        type: 'string',
      },
    ],
    name: 'staff_check',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'vaccineshotedon',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'times',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gotvaccine',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
async function getAccount() {
  Accounts = await Web3.eth.getAccounts();
  return Accounts;
}

function getLocal() {
  let islogin = localStorage.getItem('vaccine_login');
  return islogin;
}

let API = new Web3.eth.Contract(ABI, contractaddress);
export default {
  Government,
  API,
  getAccount,
  getLocal,
};
