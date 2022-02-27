const request= require("request"); 
const forecast=(lat,long,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=6a22f2a1f66afc75fadf1d6893b9634c&query='+lat+','+long
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect",undefined);
        }
        else if(body.error)
        {
            callback("unable to find",undefined);
        }
        else
        {
            const data={
                description:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                rain: body.current.precip
            }
           callback(undefined,data);
        }
        // console.log(data);
    })
   }
   module.exports=forecast;