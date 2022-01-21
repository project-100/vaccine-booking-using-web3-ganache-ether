import services from './contract';

let Data = [];

let staffData = [];

let Api = services.API;
async function Getbookings() {
  Data = [];
  let count = 0;
  console.log('called');
  while (true) {
    let data = await Api.methods.people(count).call();
    console.log(data);
    if (data.id === '0') {
      break;
    }
    Data.push(data);

    count++;
  }
  console.log(Data);
  return Data;
}
async function GetUserBookings(id) {
  if (Data.length === 0) {
    await Getbookings();
  }
  let UserBooking = [];
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].id === id) {
      UserBooking.push(Data[i]);
    }
  }
  return UserBooking;
}
function calculateTime(res) {
  let timing;
  let starttime = 9;
  if (res < 60) {
    timing = '9:' + res;
  } else {
    let temp1 = res;
    let count = 0;
    while (true) {
      if (temp1 > 60) {
        temp1 = temp1 - 60;
        count++;
      } else {
        break;
      }
    }
    starttime = starttime + count;
    timing = starttime + ':' + temp1;
  }
  return timing;
}
async function getStaff() {
  staffData = [];
  let count = 0;
  while (true) {
    let data = await Api.methods.s_login(count).call();
    if (data.staffid == 0) {
      break;
    }
    staffData.push(data);
    console.log(data.staffid);
    count++;
  }
  return staffData;
}
async function getstaffcount() {
  return staffData.length;
}
function getstaffcredential(id) {
  for (let i = 0; i < staffData.length; i++) {
    if (staffData[i].id === id) {
      return staffData[i];
    }
  }
  return null;
}

async function vaccinedetails(date) {
  let detail = await Api.methods.available(date).call();
  return detail;
}

export default {
  Getbookings,
  GetUserBookings,
  getStaff,
  getstaffcount,
  getstaffcredential,
  vaccinedetails,
  calculateTime,
};
