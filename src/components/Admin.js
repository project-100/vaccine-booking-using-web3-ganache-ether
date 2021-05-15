import { useEffect, useState } from "react";
import AdminService  from "../services/adminServices"
import services from "../services/contract"

function Admin(){
    const[staffcount,setstaffcount] = useState(0);
    const[bookings,setBookings] = useState([]);
    const[Id,setId] =useState(0);
    const[staffpass,setPass]=useState("");
    const[staffdetail,setStaff]=useState(null);

    const bookingheader=["id","bookingtime","name","status","gotvaccine","visitingtime"];
    let initialstate={
        showbookings:false
    }
    const [display,setdisplay] = useState(initialstate)

useEffect(async ()=>{
   
  
    await AdminService.getStaff();
   

},[])
 async function show(e){
     let newstate = initialstate;
     newstate[e.target.name]=true;
     if(e.target.value=="all"){
          let newData =await AdminService.Getbookings();
          setBookings(newData);

     }
     console.log(newstate);
   
     setdisplay(newstate);

        
    }
    async function showId(e){   
        let data = await AdminService.GetUserBookings(Id);
        console.log(data+Id);
        if(data)
          setBookings(data);

        show(e);
    }
function convertdate(d){
    let time = new Date(d * 1000);

    time = time.toDateString();
    return time;
}
async function updateVaccine(e){
    let Api = services.API;
    try{
        let ss=await Api.methods.vaccineshoted(Id).send({from:services.Government,gas:200000});
        console.log(ss);
        window.location.href=window.location.href;
    }
    catch(e){
        console.log(e);
    }

}
async function showstaff(){
    let Api=services.API;
    try{
       let check= await Api.methods.showstaff(Id).call();
       console.log("called1")
      setStaff(check);
      await AdminService.getStaff();
    }
    catch(e){
        console.log(e);
    }
}
async function addStaff(){
    let Api=services.API;
    let account =await services.getAccount();
  
    console.log(account);
    let staffcount = await AdminService.getstaffcount();
    try{
        let check = await Api.methods.recruitstaff(account[staffcount+1],staffpass).send({from:account[0],gas:200000});
        console.log(check);
        alert("id is" +(staffcount+101));
    }
    catch(e){
        console.log(e);
    }

}


    return(
        <>
       <div className="container">
           <div className="panel">
               <table>
                   <tr>
            <td key="1a">  <button name="showbookings" value="all" onClick={show} >Get bookings</button></td> 
             <td key="1b"> <span > <form onSubmit={(e)=>e.preventDefault()}> <input type="number" min="1001" onChange={(e)=>setId(e.target.value)} />
             <br />
              <input type="submit" name="showbookings" value={"show"} onClick={showId} />
              <input type="submit" value="vaccine shoted" onClick={updateVaccine} />
              </form></span></td>
              <td key="1d">
                       <form onSubmit={(e)=>{e.preventDefault();e.target.reset()}}>
                           <input type="text" onChange={(e)=>setPass(e.target.value)} />
                           <input type="submit" value="addstaff" onClick={addStaff} />
                       </form>
              </td>
              <td key="1c">
                  <form onSubmit={(e)=>e.preventDefault()} >
                      <input type="number" onChange={(e)=>setId(e.target.value)} />
                      <input type="submit" name="showstaff" value="showstaff" onClick={showstaff} />
                  </form>

              </td>
              </tr>
              </table>
           </div>

             
          

       </div>
       <table>
  <tr>
    {display.showbookings && bookingheader.map((value,index)=>{
        return(
            <th key={index}>{value}</th>
        )
    })}
  </tr>
      
       {display.showbookings && bookings.map((value,index)=>{
           return(
               <tr key={index+"row"} >
                   <td>{value.id}</td>
                     <td>{convertdate(value.bookingtime)}</td>
                     <td>{value.name}</td>
                     <td>{value.status?"true":"false"}</td>
                     <td>{convertdate(value.gotvaccine)}</td>
                     <td>{AdminService.calculateTime(value.visitingtime)}</td>

               </tr>
           )
       })}
       
       
        </table>
       {staffdetail!=null && <table>
            <tr>
           <th>staffaddress</th>
           <th>staffname</th>
       </tr>
       <tr>
         <td>{staffdetail.staff}</td>
         <td>{staffdetail.password}</td>
       </tr>
        </table>}
        </>
    )
}
export default Admin;