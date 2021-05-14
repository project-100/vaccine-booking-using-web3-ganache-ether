import { useEffect, useState } from 'react';
import Nav from '../components/usernavbar';
import services from '../services/contract';

function ShowBookings() {
  const [booking, setBooking] = useState({
    booked: '',
    appoinment: '',
    datetime: '',
  });
  const [account, setAccounts] = useState([]);
  useEffect(async () => {
    let Api = services.API;
    let res = await Api.methods.getBookingdetails(1001).call();
    console.log(res);
    let time = new Date(res.booked * 1000);

    time = time.toDateString();
    let timing;
    let starttime = 9;
    if (res.appoinment < 60) {
      timing = '9:' + res.appoinment;
    } else {
      let temp1 = res.appoinment;
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
    let temp = {
      booked: time,
      appoinment: timing,
      datetime: res.datetime,
    };
    if (res.booked != 0) setBooking(temp);
  }, []);
  async function handlecancel() {
    let Api = services.API;
    let account = await services.getAccount();
    let num = Number(services.getLocal());
    let cancel = await Api.methods
      .cancelvaccine(num)
      .send({ from: account[num - 1001 + 10], gas: 200000 });
    window.location.href = window.location.href;
  }

  return (
    <>
      <Nav navItems={['home']} />
      <div className='container' style={{ backgroundColor: '#E1E2E2' }}>
        {booking.booked != '' && (
          <div className='container margin-10 margin-10'>
            <div className='margin-10'>
              <h1 style={{ color: 'white' }}>You have a booking on</h1>
              <h4 style={{ color: 'wheat' }}>booking on</h4>{' '}
              <h4 style={{ color: 'whitesmoke' }}>{booking.booked}</h4>
              <h4 style={{ color: 'wheat' }}>booking date</h4>
              <h4 style={{ color: 'whitesmoke' }}>{booking.datetime}</h4>
              <h4 style={{ color: 'wheat' }}>Time</h4>
              <h4 style={{ color: 'whitesmoke' }}>{booking.appoinment}</h4>
            </div>
            <button className='button-2' onClick={handlecancel}>
              cancel booking
            </button>
          </div>
        )}
        {booking.booked == '' && (
          <h1 className='container' style={{ color: 'wheat' }}>
            no bookings
          </h1>
        )}
      </div>
    </>
  );
}

export default ShowBookings;
