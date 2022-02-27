const path = require("path")
const express =require("express");
const hbs = require("hbs");
const app=express()
const forecast= require("./utils/forecast");
const geocode = require("./utils/geocode")
//define path for express config
const viewPath=path.join(__dirname,'../templates/views');
const publicDirectoryPath=path.join(__dirname,'../public');
const partialsPath =path.join(__dirname,'../templates/partials');
//setup handlebars engine
// console.log(__dirname);
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath);
//root web browser-path
 app.use(express.static(publicDirectoryPath));
 app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Nikunj lohia'
    })
 })
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"enter an adress"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({
                error
            })}

            forecast(latitude,longitude,(error,foredata)=>{
                if(error){
                    return res.send({
                        error
                    })}
                    return res.send({
                        forecast:foredata,
                        location:location,
                        address:req.query.address
                    })             
            })
        })
    // res.send({
    //     forecast:"rainy it will",
    //     location:"assam",
    //     weather: req.query.address
    // });
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:'About',
        name:"'Nikunj lohia'"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:'Help',
        name:'Nikunj lohia',
        helptext:"Thanks for visiting the help page "
    })
})
app.get('/help/*',(req,res)=>{
    res.render("404",{
        page:"Help",
        title:"errror",
        name:'Nikunj lohia',
        error:"help page not found"
    })
})
app.get('*',(req,res)=>{
    res.render("404",{
        title:"error",
        name:'Nikunj lohia',
        error:"error page not available"
    })
})
app.listen(3000,()=>{
    console.log('server is running guyzzz'); 
})