import { useEffect, useState } from 'react';
import Nav from '../components/usernavbar';
import services from '../services/contract';
import Time from '../services/adminServices';

function ShowBookings() {
  const [booking, setBooking] = useState({
    booked: '',
    appoinment: '',
    datetime: '',
  });
  const [account, setAccounts] = useState([]);
  useEffect(async () => {
    let Api = services.API;
    let id = await localStorage.getItem('vaccine_login');
    let res = await Api.methods.getBookingdetails(id).call();
    console.log(res);
    let time = new Date(res.booked * 1000);

    time = time.toDateString();
    let timing = Time.calculateTime(res.appoinment);

    let temp = {
      booked: time,
      appoinment: timing,
      datetime: res.datetime,
    };
    if (res.booked != 0) setBooking(temp);
  }, []);
  async function handlecancel() {
    let confirm = window.confirm('confirm cancel');
    if (!confirm) {
      return;
    }
    let Api = services.API;
    let account = await services.getAccount();
    let num = Number(services.getLocal());
    let cancel = await Api.methods
      .cancelvaccine(num)
      .send({ from: account[num - 1000 + 10], gas: 200000 });
    window.location.href = window.location.href;
  }

  return (
    <>
      <Nav navItems={['home']} />
      <div className='container'>
        {booking.booked != '' && (
          <div className='container'>
            <div style={{ width: '40%', marginLeft: '30%' }}>
              <h1 style={{ color: 'white' }}>You have a booking !!</h1>
              <h4 style={{ color: 'wheat' }}>booked on</h4>{' '}
              <h4 style={{ color: 'whitesmoke' }}>{booking.booked}</h4>
              <h4 style={{ color: 'wheat' }}>alloted date</h4>
              <h4 style={{ color: 'whitesmoke' }}>{booking.datetime}</h4>
              <h4 style={{ color: 'wheat' }}>should visit on Time</h4>
              <h4 style={{ color: 'whitesmoke' }}>{booking.appoinment} hrs</h4>
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
