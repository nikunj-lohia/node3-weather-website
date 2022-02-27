const request =require("request");
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?types=poi&access_token=pk.eyJ1IjoibmlrbG9kZWFuIiwiYSI6ImNremJoeGNlYzA5dnUyeG5ybnZzaXZmdWEifQ.GM86to8DDlgjWw7HSaMydQ";
    request({url:url,json:true,},(error,{body})=>{
            //  console.log(response)
            // console.log(response.body.features);
            // console.log(body.features);
            if(error){
               callback("unable to find",undefined);
            }
            else if(body.features.length === 0)
            {
                callback("unable to find",undefined);
            }
            else{
             const data={
                 latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location:body.features[0].place_name
             }
            //  console.log(data);
             callback(undefined,data);
            }})
}
module.exports=geocode;