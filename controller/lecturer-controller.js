import { supabase } from "../database/db.js";

//get assigned students for a specific lecturer
export const assignedStudents = async (req, res) => {
    try {
        const { name } = req.query;

        const { data: students, error:fetchError } = await supabase
            .from('students')
            .select('*')
            .eq('assigned_to', name);
        
        if (fetchError) {
            console.error('Error fetching assigned students:', fetchError);
            return res.status(500).json({ status: false, message: 'Internal server error' });
        }

        return res.status(200).json({ status: true, data: students });
    } catch (error) {
        console.error('Error fetching assigned students:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

//get placements for a specific student
export const getPlacements = async (req, res) => {
    try {
        const { regno } = req.query;

        const placement = supabase
            .from('placement')
            .select('*')
            .eq('regno', regno);
        
        const logbook = supabase
            .from('logbook')
            .select("*")
            .eq('regno', regno)
        
        const [placementData, logbookData] = await Promise.all([placement, logbook]);

        const { data: placements, error: placementError } = placementData;
        const { data: logbooks, error: logbookError } = logbookData;

        if (placementError) throw placementError;
        if (logbookError) throw logbookError;

        return res.status(200).json({ status: true, placements, logbooks });
        
    } catch (error) {
        console.error('Error fetching placements:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}