import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Heading, PopUp, SelectInput } from "./components/Index";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!values.age) {
      errors.age = "Age is required";
    } else if (values.age < 18) {
      errors.age = "You must be at least 18 years old";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(values.email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!values.course) {
      errors.course = "Please select a course";
    }

    return errors;
  };

  const myForm = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      course: "",
      termsAndConditions: false,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      setShowPopUp(true);
    },
  });

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div>
          <Heading />
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form onSubmit={myForm.handleSubmit}>
              <div className="mb-5">
                <Input
                  label="Name"
                  id="name"
                  placeholder="Enter Your Full Name"
                  type="text"
                  FieldValue={myForm.values.name}
                  handleChange={myForm.handleChange}
                  error={myForm.touched.name && myForm.errors.name}
                />
              </div>

              <div className="mb-5">
                <Input
                  label="Age"
                  id="age"
                  placeholder="Enter Your Age"
                  type="number"
                  FieldValue={myForm.values.age}
                  handleChange={myForm.handleChange}
                  error={myForm.touched.age && myForm.errors.age}
                />
              </div>

              <div className="mb-5">
                <Input
                  label="Email Address"
                  id="email"
                  placeholder="Enter Your Email Address"
                  type="email"
                  FieldValue={myForm.values.email}
                  handleChange={myForm.handleChange}
                  error={myForm.touched.email && myForm.errors.email}
                />
              </div>

              <div className="mb-5">
                <SelectInput
                  label="Select Course"
                  myForm={myForm}
                  id="course"
                  options={[
                    { value: "", optionlabel: "Choose a Option" },
                    {
                      value: "web-development",
                      optionlabel: "Web Development",
                    },
                    { value: "data-science", optionlabel: "Data Science" },
                    { value: "ai-ml", optionlabel: "AI & Machine Learning" },
                    { value: "cyber-security", optionlabel: "Cyber Security" },
                  ]}
                />
              </div>

              <div className="mb-5 mt-5">
                <input
                  id="termsAndConditions"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50"
                  checked={myForm.values.termsAndConditions}
                  onChange={() =>
                    myForm.setFieldValue(
                      "termsAndConditions",
                      !myForm.values.termsAndConditions
                    )
                  }
                  required
                />
                <label
                  htmlFor="termsAndConditions"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <a className="hover:cursor-pointer text-blue-600 underline">
                    terms and conditions
                  </a>
                </label>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-teal-700 hover:bg-teal-600 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:cursor-pointer"
                >
                  Submit Information
                </button>
              </div>
            </form>

            {showPopUp && <PopUp myForm={myForm} setShowPopUp={setShowPopUp} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
