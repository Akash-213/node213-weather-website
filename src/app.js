const path = require('path')
const express = require('express')
const { static } = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const darksky=require('./utils/darksky')
const location_address = require('./utils/darksky')


const app =express()
const port = process.env.PORT || 3000

//setup path for express config
const publicDirectorypath = path.join(__dirname , '../public')
const viewspath =path.join(__dirname ,'../templates/views')
const partialspath = path.join(__dirname ,'../templates/partials')

//Set handlebars engine annd views
app.set('view engine','hbs')
app.set('views' ,viewspath)
hbs.registerPartials(partialspath)

//setup static directory path
app.use(express.static(publicDirectorypath))

app.get('',(req,res) =>{
    res.render('index' ,{
        title: 'Weather' ,
        name :'Akash'
    })
})
app.get('/about' ,(req,res) =>{
    res.render('about' ,{
        title :'About Us' ,
        name : 'Akash'    })
})

app.get('/help' ,(req,res) =>{
    res.render('help' ,{
        title: 'HELP'  ,
        info:'You recieve assistance here !!' ,
        name :'Akash'
    })
})


app.get('/weather' ,(req,res) =>{

    if(!req.query.address){
        return res.send({
            error:'Please provide a search location !!'
        })
    }
    geocode(req.query.address,(error ,location_data) =>{
        
        if (error){
            return res.send({error})
        }
        
        location_address(location_data.latitude ,location_data.longitude ,(error,forecast_data = {} ) =>{

            if(error){
                return res.send({error })
                
            
            }
            res.send({
                Location:location_data.location ,
                Forecast :forecast_data ,
                Address : req.query.address
            })
        })
    })
})

app.get('/products' ,(req,res) =>{

    if(!req.query.search){
        return res.send({
            error :'Please provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        search: req.query.search
    })
})

app.get('/help/*' ,(req,res) =>{
    res.render('error',{
        errormsg :"PAGE NOT FOUND !!"
    })
})

app.get('*' ,(req,res) =>{
    res.render('error' ,{
        errormsg :"OOPS it seems you are at wrong page."
    })
})

app.listen(port, ()=> {
    console.log('Server started on port : ' +port)
})
