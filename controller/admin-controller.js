import { supabase } from "../database/db.js";

export const addCompany = async (req, res) => {
    const { company_name, industry, students_needed } = req.body;

    let students_accepted = 0
    let status = false

    try {
        // Insert data into the companies table
        const { error } = await supabase
            .from('Companies')
            .insert([{ company_name, industry, students_needed, students_accepted, status }])
            .single();
        
        if (error) {
            console.log(error);
            throw new Error(error);
        }

        res.status(201).json({status: true});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

