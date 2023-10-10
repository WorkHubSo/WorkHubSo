import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom"
import * as Yup from 'yup'
import { useAddJopOfferMutation, useUpdateJobOfferMutation } from "../../redux/employer_redux/slices/Employer_job_offer";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const JopOffer = () => {
  const res_job_state = useLocation().state
  const [value, setValue] = useState('');
  const [addJopOffer] = useAddJopOfferMutation();
  const [updateJobOffer] = useUpdateJobOfferMutation();
  const [coverFile, setCoverFile] = useState(null);
  const uploadCover = async () => {
    try {

      let formdata = new FormData();
      formdata.append('file', coverFile || '');
      const res = await axios.post("http://localhost:8000/api/upload", formdata)
      return res.data;

    } catch (error) {
      console.log(`error uploading : ${error.message}`);
    }
  }

  const initialValues = {
    jobTitle: res_job_state?.jobTitle || '',
    category: res_job_state?.category || '',
    typeEmployement: res_job_state?.typeEmployement || '',
    experienceLevel: res_job_state?.experienceLevel || '',
    requiredExperience: res_job_state?.requiredExperience || '',
    salary: res_job_state?.salary || '',
    deadline: res_job_state?.deadline || '',
    externalUrl: res_job_state?.externalUrl || '',
    branch: res_job_state?.branch || '',
    location: res_job_state?.location || '',
  }

  useEffect(() => {
    if (res_job_state?.description) {
      setValue(res_job_state?.description);
    }
  }, [res_job_state]);

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title'),
    category: Yup.string().required('Choose Category'),
    typeEmployement: Yup.string().required('Type Employement'),
    experienceLevel: Yup.string().required('Experience Level'),
    requiredExperience: Yup.string().required('Required Experience'),
    salary: Yup.number().required('Salary'),
    deadline: Yup.date().required('Deadline'),
    externalUrl: Yup.string().required('External Url'),
    branch: Yup.string().required('Branch'),
    location: Yup.string().required('Location'),

  })

  const handleSubmit = async (values, { resetForm }) => {
    const id = res_job_state?._id || ''

    if (!id) {

      try {
        const description = value
        const { jobTitle, category, typeEmployement, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location } = values;
        const cover = await uploadCover();
        await addJopOffer({ jobTitle, category, typeEmployement, description, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location, cover })
          .then((res) => {
            const status = res.data.status;
            if (status) {
              toast.success(res.data.message)
            } else {
              toast.error(res.data.message)
            }
          })

      } catch (error) {
        console.log('error', error);
      }

    } else {

      try {
        const description = value
        const { jobTitle, category, typeEmployement, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location } = values;
        const cover = await uploadCover();
        await updateJobOffer({ id: id, updateJob: { jobTitle, category, typeEmployement, description, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location, cover } }).then((res) => {
          toast.success(res.data.message)
        })

      } catch (error) {
        console.log('error', error);
      }

    }

    resetForm();


  }

  return (
    <div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
      <h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
        <Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
        <small>/</small>
        <span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Job Offer</span>
      </h1>
      <div className="mt-5 w-full lg:w-[90%] bg-white shadow rounded p-4 ">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form className="w-full flex flex-col justify-start items-start gap-2 space-y-3">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-4">
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Job Title' name="jobTitle" />
                <ErrorMessage className="text-red-500" component='div' name="jobTitle" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' as='select' placeholder='Category' name="category">
                  <option value="">-select category--</option>
                  <option value="Technology and IT">Technology and IT</option>
                  <option value="Finance and Accounting">Finance and Accounting</option>
                  <option value="Healthcare and Medicine">Healthcare and Medicine</option>
                  <option value="Sales and Marketing">Sales and Marketing</option>
                  <option value="Education and Teaching">Education and Teaching</option>
                  <option value="Creative Arts and Design">Creative Arts and Design</option>
                  <option value="Administrative and Clerical">Administrative and Clerical</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                </Field>
                <ErrorMessage className="text-red-500" component='div' name="category" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' as='select' placeholder='Type Employement' name="typeEmployement">
                  <option value="">-Select Type Employement--</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </Field>
                <ErrorMessage className="text-red-500" component='div' name="typeEmployement" />
              </div>
              <div className="w-full">
                <input className='outline-[#007bff] w-full p-2 rounded shadow' type='file' placeholder='cover photo' onChange={(e) => setCoverFile(e.target.files[0])} />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' as='select' placeholder='Experience Level' name="experienceLevel">
                  <option value="">-Select Experience Level --</option>
                  <option value="Top Level">Top Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </Field>
                <ErrorMessage className="text-red-500" component='div' name="experienceLevel" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Required Experience' name="requiredExperience" />
                <ErrorMessage className="text-red-500" component='div' name="requiredExperience" />
              </div>
            </div>
            <div className="w-full">
              <ReactQuill className="h-fit" theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-4">
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='External Url' name="externalUrl" />
                <ErrorMessage className="text-red-500" component='div' name="externalUrl" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='number' placeholder='Salary' name="salary" />
                <ErrorMessage className="text-red-500" component='div' name="salary" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='date' placeholder='Deadline' name="deadline" />
                <ErrorMessage className="text-red-500" component='div' name="deadline" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Branch' name="branch" />
                <ErrorMessage className="text-red-500" component='div' name="branch" />
              </div>
              <div className="w-full">
                <Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Location' name="location" />
                <ErrorMessage className="text-red-500" component='div' name="location" />
              </div>
            </div>
            <button type="submit" className="lg:w-[30%] bg-[#007bff] text-white hover:bg-blue-600 w-full p-3 rounded shadow">Save Job Offer</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default JopOffer