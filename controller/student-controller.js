import { supabase } from "../database/db.js"

//upload students dTA TO DB
export const register = async (req, res) => {
    const {name, regno, course} = req.body

    try {
        const {data, error} = await supabase
            .from('simple')
            .insert([{name:name, regno:regno, course:course}])
            .select()

        if (error) {
            return res.status(400).json({message: 'An error occured while uploading data', error: error.message})
        }  

        return res.status(201).json({message: 'Data uploaded successfully', data})
            
    } catch (error) {
        console.log(error.message)
        throw new Error('An error occured while uploading data')
    }
}

//APPLY FOR JOB
export const apply = async (req, res) => {
    const { name, regno, company, position, status} = req.body

    try {
        const {error} = await supabase
            .from('applications')
            .insert([{name, regno, company, position, status}])
            .select()

        if (error) {
            return res.status(400).json({message: 'An error occured while uploading data', error: error.message})
        }  

        res.status(201).json({message: 'success'})
            
    } catch (error) {
        console.log(error.message)
        throw new Error({message: 'An error occured while uploading data', error: error.message})
    }
}

//GET STUDENT APPLICATIONS
export const getApplications = async (req, res) => {
    const regno = req.query.regno
    try {
        const {data, error} = await supabase
            .from('applications')
            .select("*")
            .eq('regno', regno)

        if (error) {
            return res.status(400).json({message: 'An error occured while fetching data', error: error.message})
        }

        res.status(200).json({status: true, data})
    } catch (error) {
        res.status(500).json({status: false,message: error})
    }
}