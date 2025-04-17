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

//logbook entry
export const logBook = async (req, res) => {
    const {regno, week_number, report, comments} = req.body

    const status = 'pending'

    try {
        const {error} = await supabase
            .from('logbook')
            .insert([{regno, week_number, report, comments, status}])
            .select()

        if (error) {
            return res.status(400).json({message: 'An error occured while uploading data', error: error.message})
        }  

        res.status(201).json({status: true})
            
    } catch (error) {
        console.log(error.message)
        throw new Error({message: 'An error occured while uploading data', error: error.message})
    }
}

//GET STUDENT LOGBOOK
export const getLogBook = async (req, res) => {
    const regno = req.query.regno
    try {
        const {data, error} = await supabase
            .from('logbook')
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

//GET STUDENT ASSIGNED TO
export const assignedTo = async (req, res) => {
    const regno = req.query.regno

    try {
        const {data, error} = await supabase
            .from('students')
            .select("assigned_to")
            .eq('regno', regno);

        if (error) {
            return res.status(400).json({message: 'An error occured while fetching data', error: error.message})
        }

        res.status(200).json({status: true, tutor: data[0].assigned_to})
    } catch (error) {
        res.status(500).json({status: false,message: error})
    }
}

//Post placement data
export const placement = async (req, res) => {
    const { regno, company, position, town, location, building, floor, phone, commencement } = req.body

    try {
        const {data,error} = await supabase
            .from('placement')
            .upsert(
                { regno, company, position, town, location, building, floor, phone, commencement },
                { onConflict: ['regno'] }
            )
            .select()

        if (error) {
            return res.status(400).json({message: 'An error occured while uploading data', error: error.message})
        }  

        res.status(201).json({status: true})
            
    } catch (error) {
        console.log(error.message)
        throw new Error({message: 'An error occured while uploading data', error: error.message})
    }
}

//update logbook status
export const logbookApproval = async (req, res) => {
    const { regno, week_number } = req.body;

    try {
        const { error } = await supabase
            .from('logbook')
            .update({ status: 'approved' })
            .eq('regno', regno)
            .eq('week_number', week_number);
        
        if (error) {
            throw new Error(error);
        }

        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//upload file to supabase storage
export const uploadFile = async (req, res) => {
    const { regno, name, filename} = req.body; 
    console.log(req.body)
    try {
         //get the file public url
        const { data: { publicUrl } } = await supabase
        .storage
        .from('iamisfiles')
        .getPublicUrl(filename);

        //store the file in the database
        const { data: fileUploadData, error } = await supabase
            .from('reports')
            .insert([{ regno, name, publicUrl }])
            .select();

        if (error) {
            return res.status(400).json({ message: 'An error occurred while uploading the file', error: error.message });
        }

        res.status(200).json({ status: true, fileUploadData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while uploading the file', error: error.message });
    }
}

