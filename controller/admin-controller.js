import { supabase } from "../database/db.js";
//addCompany function is used to add a company to the database
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

//getCompanies function is used to get all the companies from the database
export const getCompanies = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Companies')
            .select('company_name, industry, students_needed, students_accepted, status');
        
        if (error) {
            throw new Error(error);
        }

        res.status(200).json({ message: 'success', data: data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//updateStatus function is used to update the acquiring status of a company
export const updateStatus = async (req, res) => {
    const { company_name, status } = req.body;

    try {
        const { error } = await supabase
            .from('Companies')
            .update({ status: status })
            .eq('company_name', company_name);
        
        if (error) {
            throw new Error(error);
        }

        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}