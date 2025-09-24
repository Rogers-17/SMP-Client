import Swal from 'sweetalert2'
import axios from 'axios'
import { toast } from 'react-toastify';

export const AddCourse = async () => {
    const { value: formValues } = await Swal.fire({
        title: 'Add new Student',
        html:`
        <input id="swal-course-name" class="swal2-input" placeholder="Course Name"/>
        <input id="swal-course-code" class="swal2-input" placeholder="Code"/>
        <select id="swal-course-college" class="swal2-input">
        <option value="">Select College</option>
        <option value="IT College">IT College</option>
        <option value="Business College">Business College</option>
        </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonColor: "red",
        confirmButtonText: 'Submit',
        confirmButtonColor: "#3b82f6",
        preConfirm: () => {
            const courseName = document.getElementById("swal-course-name").value;
            const college = document.getElementById("swal-course-college").value;
            const code = document.getElementById("swal-course-code").value;

            if(!courseName || !college || !code) {
                Swal.showValidationMessage("All Fields are required");
                return false;
            }

            return { courseName, college, code}
        },
    });

    if(formValues) {
        try{
            const res = await axios.post("http://localhost:4000/api/courses", formValues)
            toast.success('Course Created successfully!', {
            position: 'top-right',
            autoClose: 1000,
            });
            window.location.reload();
        } catch(err) {
            toast.error("Error");
        }
    }
};
