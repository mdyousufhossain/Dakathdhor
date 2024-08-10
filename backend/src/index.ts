/**
 * note eta just beta project so please dont judge my spaghetti code 
 * and arekta secret ami ashole production e test kori , :> but eibar tester on kora lagbbe , so choose your expertise
 * 10-aug-24 
 */


import express from 'express';
const app  =  express()

const PORT = 9000

/**
 * this is the watcher , well not that good but at least somet'n 
 */




// just for the starter delete this not required ! 
app.get('/',(req,res) => {
    res.send('Hello Dakath!')   
})




const startServer =  async () => {
    try {
        // database calling maybe 
        app.listen(PORT,
            () => {
                // maybe remove when on live ? 
                console.log(`Server started at : http://localhost:${PORT}`)
            })
    } catch (error) {
       console.error(error) 
    }
}

startServer()