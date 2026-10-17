import express from "express";
import db from "../db.js";

const router = express.Router();

//retrieve all employees
router.get("/", async(req, res)=>{
    try {
        const [results] = await db.execute(
            "select id, first_name, last_name, email, department from employees"

        )

        if(results === 0){
            return res.status(200).json({
                message:"no employee found"
            })
        }

        return res.status(200).json({
            message:"employees retrieved succesfully",
            data:results
        })


        
    } catch (error) {
        console.log(error)
        
    }
});

//retrieve one employee by id
router.get("/:id", async(req, res)=>{
    try {

        const {id}= req.params;
        console.log(id)
        const [results] = await db.execute(
            "select  first_name, last_name, email, department from employees where id=?", [id]

        )

        if(results === 0){
            return res.status(200).json({
                message:"no employee found"
            })
        }

        return res.status(200).json({
            message:"employees retrieved succesfully",
            data:results
        })


        
    } catch (error) {
        console.log(error)
        
    }
});


//filter by department
router.get("/department/:department", async(req, res)=>{
    try {

        const {department}= req.params;
        console.log(department)
        const [results] = await db.execute(
            "select id, first_name, last_name, email, department from employees where department=?", [department]

        )

        if(results.length === 0){
            return res.status(200).json({
                message:"no employee found"
            })
        }

        return res.status(200).json({
            message:"employees retrieved succesfully",
            data:results
        })


        
    } catch (error) {
        console.log(error)
        
    }
});

//create employees
router.post("/", async(req, res)=>{
    try {

        const {first_name, last_name, email, department, salary}= req.body;

        const [results] = await db.execute(
            "insert into employees (first_name, last_name, email, department, salary) values(?, ?, ?, ?, ?)", [first_name, last_name, email, department, salary]

        )

        const employee_id = results.insertId;

        const [employee] = await db.execute ("select first_name, last_name, email, department from employees where id=?", [employee_id])

   

        return res.status(200).json({
            message:"employees retrieved succesfully",
            data:employee
        })


        
    } catch (error) {
        console.log(error)
        
    }
});






export default router;