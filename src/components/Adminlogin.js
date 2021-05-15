import {useState,useEffect} from "react"
import services from "../services/contract"
import Nav from "../components/usernavbar"



function Adminlogin(){
    const[id,setId] = useState(0);
    const[pass,setpass] =useState("");






    async function Submit(e){
        let accounts = await services.getAccount();
          let Api = services.API;
        if(id==100){
          
            let credential = await Api.methods.secret().call();
            if(pass==credential){
                window.location.href="http://localhost:3000/admin"
            }
            else{
                alert("password not matching")
            }
         
        }
        else{
            let checkstaff = await Api.methods.staff_check(id,pass).call();
            if(checkstaff){
                 window.location.href="http://localhost:3000/admin"
            }
            else{
                alert("not a valid credential please check");
            }
        }
    }



    return (
        <>
        <Nav navItems={["/"]} />
        <div className='container'>
        <form className='formcontainer' onSubmit={(e) => {e.preventDefault();e.target.reset()}}>
          <div className='msg'>ADMIN LOGIN</div>
          <input
            type='number'
            placeholder='ID'
            className='input-box margin-10'
            min='100'
            onChange={(e) => {
              setId(e.target.value);
            }}
          />

          <input
            type='password'
            placeholder='PASSWORD'
            className='input-box'
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <br />
          <input
            type='submit'
            value='LOGIN'
            className='button-1'
            onClick={Submit}
          />
        </form>
      </div>
      </>
    )
}
export default Adminlogin;