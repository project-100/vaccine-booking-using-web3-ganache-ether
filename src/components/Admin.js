import { useEffect, useState } from 'react';
import AdminService from '../services/adminServices';
import services from '../services/contract';
import { Link } from 'react-router-dom';

function Admin() {
  const [staffcount, setstaffcount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [Id, setId] = useState(0);
  const [staffpass, setPass] = useState('');
  const [staffdetail, setStaff] = useState(null);
  const [loading, isLoading] = useState(false);

  const bookingheader = [
    'id',
    'bookingtime',
    'name',
    'status',
    'gotvaccine',
    'visitingtime',
    'center',
  ];
  let initialstate = {
    showbookings: false,
  };
  const [government, isgovernment] = useState(false);
  const [display, setdisplay] = useState(initialstate);

  useEffect(async () => {
    console.log('use efect');
    let id = localStorage.getItem('staff');

    if (id === '100') {
      console.log(id + 'sssssssss');
      isgovernment(true);
    }
    // await AdminService.getStaff();
  }, []);
  async function show(e) {
    if (loading == true) {
      alert('loading please wait for previous request');
      return;
    }
    isLoading(true);
    let newstate = initialstate;
    newstate[e.target.name] = true;
    if (e.target.value == 'all') {
      let newData = await AdminService.Getbookings();
      setBookings(newData);
    }
    console.log(newstate);

    setdisplay(newstate);

    isLoading(false);
  }
  async function showId(e) {
    if (loading == true) {
      alert('loading please wait for previous request');
      return;
    }
    isLoading(true);
    let data = await AdminService.GetUserBookings(Id);
    console.log(data + Id);
    if (data) setBookings(data);

    show(e);
    isLoading(false);
  }

  function convertdate(d) {
    if (d == 0) {
      return 'not yet vaccinated';
    } else if (d == 1) {
      return 'cancelled';
    }
    let time = new Date(d * 1000);

    time = time.toDateString();
    return time;
  }
  async function updateVaccine(e) {
    if (loading == true) {
      alert('loading please wait for previous request');
      return;
    }
    isLoading(true);
    let Api = services.API;
    try {
      let account = await services.getAccount();

      let ss = await Api.methods.vaccineshoted(Id).send({
        from: account[localStorage.getItem('staff') - 100],
        gas: 200000,
      });
      let newData = await AdminService.Getbookings();
      setBookings(newData);
      setdisplay(initialstate);
      isLoading(false);
    } catch (e) {
      console.log(e);
      isLoading(false);
    }
  }
  async function showstaff(id = 0) {
    if (loading == true) {
      alert('loading please wait for previous request');
      return;
    }

    isLoading(true);

    let Api = services.API;
    try {
      let new_id = Id;
      if (id > 0) {
        new_id = id;
      }
      let check = await Api.methods.showstaff(new_id).call();
      console.log('called1');
      setStaff(check);

      // await AdminService.getStaff();
      setdisplay(initialstate);
      isLoading(false);
    } catch (e) {
      console.log(e);
      isLoading(false);
    }
  }
  async function addStaff() {
    if (loading == true) {
      alert('loading please wait for previous request');
      return;
    }
    isLoading(true);
    let Api = services.API;
    let account = await services.getAccount();

    console.log(account);
    let staffcount = await AdminService.getstaffcount();
    try {
      let check = await Api.methods
        .recruitstaff(account[staffcount + 1], staffpass)
        .send({ from: account[0], gas: 200000 });
      console.log(check);
      alert('new staff id is' + (staffcount + 101));

      isLoading(false);
      showstaff(staffcount + 101);
    } catch (e) {
      console.log(e);
      alert('error adding staff now try later');
    }
  }

  return (
    <>
      <div
        className='container'
        style={{ backgroundImage: 'unset', backgroundColor: '#1d2228' }}
      >
        <div className='panel'>
          <table className='table-class'>
            <tr className='tr-class'>
              <td className='td-class' key='1b'>
                {' '}
                <span>
                  {' '}
                  <form onSubmit={(e) => e.preventDefault()}>
                    {' '}
                    <input
                      type='number'
                      className={'input-box'} 
                     
                      placeholder='enter Id'
                      min='1001'
                      onChange={(e) => setId(e.target.value)}
                    />
                    <br />
                    <input
                      type='submit'
                      className='button-2 '
                      name='showbookings'
                      value={'show'}
                      onClick={showId}
                    />
                    <input
                      type='submit'
                      className='button-2 '
                      value='vaccine shoted'
                      onClick={updateVaccine}
                    />
                  </form>
                </span>
              </td>
              {government && (
                <>
                  {' '}
                  <td class='td-class' key='1d'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.target.reset();
                      }}
                    >
                      <input
                        type='password'
                        placeholder='enter password for new staff'
                        className='input-box width-50'
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <br />
                      <input
                        type='submit'
                        className='button-2 width-50'
                        value='addstaff'
                        onClick={addStaff}
                      />
                      <br></br>
                    </form>
                  </td>
                  <td class='td-class' key='1c'>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type='number'
                        placeholder='enter staff Id'
                        className='input-box'
                        onChange={(e) => setId(e.target.value)}
                      />
                      <input
                        type='submit'
                        className='button-2 width-50'
                        name='showstaff'
                        value='showstaff'
                        onClick={showstaff}
                      />
                    </form>
                  </td>
                  <td class='td-class' key='1a'>
                    <button
                      name='showbookings'
                      className='button-2 width-50'
                      value='all'
                      onClick={show}
                    >
                      show bookings
                    </button>
                  </td>{' '}
                </>
              )}
              <td>
                <Link
                  to='/logout'
                  className='button-2'
                  style={{
                    width: '100%',
                    padding: '5%',
                    backgroundColor: 'wheat',
                  }}
                  onClick={() => localStorage.removeItem('staff')}
                >
                  LogOut
                </Link>
              </td>
            </tr>
          </table>
        </div>

        <table className='table-class'>
          <tr class='tr-class'>
            {display.showbookings &&
              bookingheader.map((value, index) => {
                return (
                  <th class='th-class' key={index}>
                    {value}
                  </th>
                );
              })}
          </tr>

          {display.showbookings &&
            !loading &&
            bookings.map((value, index) => {
              return (
                <tr class='tr-class' key={index + 'row'}>
                  <td class='td-class'>{value.id}</td>
                  <td class='td-class'>{convertdate(value.bookingtime)}</td>
                  <td class='td-class'>{value.name}</td>
                  <td class='td-class'>{value.status ? 'true' : 'false'}</td>
                  <td class='td-class'>{convertdate(value.gotvaccine)}</td>
                  <td class='td-class'>
                    {AdminService.calculateTime(value.visitingtime)}
                  </td>
                  <td class='td-class'>{value.centername}</td>
                </tr>
              );
            })}
        </table>
        {staffdetail != null && !loading && (
          <table className='table-class' onDoubleClick={() => setStaff(null)}>
            <tr class='tr-class'>
              <th class='th-class'>staffaddress</th>
              <th class='th-class'>staffname</th>
            </tr>
            <tr class='tr-class'>
              <td class='td-class'>{staffdetail.staff}</td>
              <td class='td-class'>{staffdetail.password}</td>
            </tr>
          </table>
        )}
        {loading && (
          <div>
            <div class='loader' style={{ marginLeft: '45%' }}></div>
          </div>
        )}
      </div>
    </>
  );
}
export default Admin;
