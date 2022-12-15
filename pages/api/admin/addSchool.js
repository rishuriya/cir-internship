import db_connect from "../../../utils/db_connect";
import Branch from "../../../models/branch";
import Course from "../../../models/course";
import School from "../../../models/school";

export default async function handeler(req, res) {
    await db_connect();
    try {
        
        if(req.body.type === 'branch') {
           const data = {
                school_name: req.body.school_name,
                course: req.body.course,
                branch: req.body.branch,
                semester: req.body.semester,
            }
            let branch = new Branch(data);

            if (!branch) {
                return res.status(400).json({ success: false, message: 'branch not created' })
            }

            let result = await branch.save();

            return await res.status(200).json({ success: true, message: 'branch Added', school: result })
        }
        else if(req.body.type === 'course') {
            const data = {
                school_name:req.body.school_name,
                course_name: req.body.course_name,
                
            }
            let course = new Course(data);

            if (!course) {
                return res.status(400).json({ success: false, message: 'Course not created' })
            }

            let result = await course.save();

            return await res.status(200).json({ success: true, message: 'course Added', school: result })
        }
        else if(req.body.type === 'school'){
           const data = {
                
                school_name: req.body.school_name,
                
            }
            let course = new School(data);

            if (!course) {
                return res.status(400).json({ success: false, message: 'School not created' })
            }

            let result = await course.save();

            return await res.status(200).json({ success: true, message: 'School Added', school: result })
        }
        else{
           
        }
        
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}