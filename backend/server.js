/**
 * note eta just beta project so please dont judge my spaghetti code 
 * and arekta secret ami ashole production e test kori , :> but eibar tester on kora lagbbe , so choose your expertise
 * 10-aug-24 
 */


const express =  require('express')
const app  =  express()
const PORT =  9000;


app.get('/',(req,res) => {
    res.send('Hello Dakath!')   
})




const startServer =  async () => {
    try {
        // database calling maybe 
        app.listen(PORT,
            () => {
                console.log(`Server started at : http://localhost:${PORT}`)
            }
        )
    } catch (error) {
       console.error(error) 
    }
}

startServer()