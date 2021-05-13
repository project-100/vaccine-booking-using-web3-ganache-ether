import { useEffect, useState } from "react";
import Nav from "../components/usernavbar"
import services from "../services/contract"


function UserHome({match}){
    const[minDate,setMinDate]=useState("");
    const[detail,setDetails]=useState({
        name:"",
        date:"",
        center:"center1"
    })
  
    useEffect(()=>{
        console.log(match.params.address);
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate()+1)
        let islessday="";
        let islessmonth=""
        if(tomorrow.getDate()<10){
        islessday="0"
        }
        if(tomorrow.getMonth()<10){
            islessmonth="0";
        }
        let todaydate=tomorrow.getFullYear()+"-"+islessmonth+(tomorrow.getMonth()+1)+"-"+islessday+tomorrow.getDate();
        setMinDate(todaydate);
        console.log(todaydate);


    },[])

    function handlechange(e){
        setDetails({...detail,[e.target.name]:e.target.value});

    }
    async function Submit(e){
        // e.target.reset;
        let Api = services.API;
        let book = await Api.methods.bookvaccine(1001,detail.name,detail.date,detail.center).send({from:match.params.address,gas:300000});
        console.log(book);
      
    }

    return(
     <>
       <Nav />
       <div className="container" style={{backgroundColor:"#E1E2E2"}}>
          
           
             <form className="formcontainer" style={{backgroundColor:"#1D2228"}} onSubmit={(e)=>{e.preventDefault();e.target.reset()}}>
                
                 <input type="text" name="name" placeholder="your name" className="input-box margin-10" onChange={handlechange} />
                 <input type="date" className="input-box" name="date" min={minDate} onChange={handlechange}/>
                 
                 <select className="input-box" name="center" onChange={handlechange} >
                     <option value="center1">center1</option>
                     <option value="center2">center2</option>
                     <option value="center3">center3</option>
                     
                     </select><br/>
                 <input type="submit" value="BOOK VACCINE" className="button-1" onClick={Submit} />
                 
                

               
             </form>
       </div>
       </>
    )
}

export default UserHome;