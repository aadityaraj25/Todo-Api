import express from 'express'

const route = express.Router();

route.get("/",(req,res)=>{
    res.send(`Your TODO API is running`)
})

export default route;
//because the route is exported using default it can be imported using any name
