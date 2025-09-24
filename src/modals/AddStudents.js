import Swal from 'sweetalert2'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AddStudents = async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Add New Student',
        html:`
        <input id="swal-student-name" class="swal2-input" placeholder="Student Name"/>
        <input id="swal-student-id" type="number" class="swal2-input" placeholder="ID Number"/>
        <input id="swal-student-password" type="password" value="password123" class="swal2-input" placeholder="Pass Word"/>
        <select id="swal-student-major" class="swal2-input">
        <option value="">Select Major</option>
        <option value="IT">IT</option>
        <option value="Business">Business</option>
        <option value="Database">Database</option>
        </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonColor: "red",
        confirmButtonText: 'Submit',
        confirmButtonColor: "#3b82f6",
        preConfirm: () => {
            const studentName = document.getElementById("swal-student-name").value;
            const studentId = document.getElementById("swal-student-id").value;
            const password = document.getElementById("swal-student-password").value;
            const major = document.getElementById("swal-student-major").value;

            if(!studentId || !studentName || !major) {
                Swal.showValidationMessage("All Fields are required");
                return false;
            }

            return { studentName, studentId, password, major}
        },
    });

    if(formValues) {
        try{
            const res = await axios.post("http://localhost:4000/api/students", formValues);
            toast.success('Student Created successfully!', {
            position: 'top-right',
            autoClose: 1000,
            });
            window.location.reload();
        } catch(error) {
            console.error(error);
            toast.error("ID Already exists")
        }
    }
};