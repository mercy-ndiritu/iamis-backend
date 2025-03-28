import { supabase } from "../database/db.js";

//assigning students to tutors based on the number of students and tutors available.
export const assignStudentsLogic = async (studentsData, tutorData) => {
    const studentsNumber = studentsData.length;
    const tutorsNumber = tutorData.length;
    const studentsPerTutor = Math.floor(studentsNumber / tutorsNumber);
    const extraStudents = studentsNumber % tutorsNumber;

    // Distribute students
    let studentIndex = 0;
    let assignments = [];

    // Assign students to each tutor
    for (let i = 0; i < tutorsNumber; i++) {
        // Determine how many students this tutor will get
        const tutorStudentCount = i === 0 
            ? studentsPerTutor + extraStudents  // First tutor gets extra students
            : studentsPerTutor;

        // Assign students to this tutor
        const assignedStudentsForTutor = studentsData
            .slice(studentIndex, studentIndex + tutorStudentCount)
            .map(student => ({
            ...student,
            assigned_to: tutorData[i].name  // Assign tutor's name
            }));

        // Update tutor's assigned students
        assignments.push(assignedStudentsForTutor);

        // Move student index
        studentIndex += tutorStudentCount;
    }

    return assignments;
}

//update students in the database
export const updateAssignmentsLogic = async (studentsData) => {
    try {
        const upsertPromises = studentsData.map(record => 
            supabase
              .from('students')
              .upsert(record, { 
                onConflict: 'id',  // Specify the unique constraint column
                returning: 'minimal'  // Optionally reduce payload
              })
          );
      
          // Execute all upserts in parallel
          const results = await Promise.all(upsertPromises);
      
          // Check for any errors
          const errors = results.filter(result => result.error);
          if (errors.length > 0) {
            console.log('Upsert errors:', errors);
            return { success: false, errors };
          }

        return { 
            success: true,
            message: `Successfully upserted ${studentsData.length} records`
        };
    } catch (error) {
        return { status: false, message: error.message };
    }
}
