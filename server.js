import express from "express";
import db from "./db.js"
import employeeRoutes from "./routes/employeeRoutes.js"

const app = express();

app.use(express.json());

//routes
app.get("/", async(req, res)=>{
    try {

        const [results] = await db.execute(
            "select 1 from test"
        )

        console.log(results);
        return res.status(200).json({
            message:results
        })
        
    } catch (error) {
        console.log(error)
        
    }
})


app.use("/api/employee", employeeRoutes);



app.listen(5000, ()=>{
    console.log("server running on port 5000")
})