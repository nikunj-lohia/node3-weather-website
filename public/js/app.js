
const weatherform =document.querySelector('form');
const input=document.querySelector('input');
const msg1=document.querySelector('#msg-1');
const msg2=document.querySelector('#msg-2');


weatherform.addEventListener('submit',(e)=>{
    msg1.textContent="Loading...";
    msg2.textContent="";
    e.preventDefault()
    // console.log('testing');
    const location =input.value;
    if(!location){
        // console.log("enter an address");
           msg1.textContent= 'enter an address';

    }else{
        fetch("http://localhost:3000/weather/?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(!data.error){
                msg1.textContent=data.location;
                msg2.textContent=data.forecast.description+" There is "+data.forecast.rain+"% chance of rain.It is " +data.forecast.temperature+" degree centigrade outside."
            }
            else{
                msg1.textContent=data.error;
                msg2.textContent="";
            }
         })
        })
    }
})