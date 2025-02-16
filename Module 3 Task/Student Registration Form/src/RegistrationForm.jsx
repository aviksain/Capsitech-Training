import React from "react";
import { useFormik } from "formik";
import Input from "./components/Input";

function RegistrationForm() {
  const myForm = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      course: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div class="flex items-center justify-center p-12">
        <div>
          <div class="sm:mx-auto sm:w-full sm:max-w-md mb-10">
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Student Registration Form
              <br />
              <p class="text-center text-sm font-normal text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                sed qui vero?
              </p>
            </h2>
          </div>
          <div class="mx-auto w-full max-w-[550px] bg-white">
            <form onSubmit={myForm.handleSubmit}>
              <div class="mb-5">
                <Input
                  label="Name"
                  id="name"
                  placeholder="Enter Your Full Name"
                  type="text"
                  FieldValue={myForm.values.name}
                  handleChange={myForm.handleChange}
                />
              </div>

              <div class="mb-5">
                <Input
                  label="Age"
                  id="age"
                  placeholder="Enter Your Age"
                  type="number"
                  FieldValue={myForm.values.age}
                  handleChange={myForm.handleChange}
                />
              </div>

              <div class="mb-5">
                <Input
                  label="Email Address"
                  id="email"
                  placeholder="Enter Your Email Address"
                  type="email"
                  FieldValue={myForm.values.email}
                  handleChange={myForm.handleChange}
                />
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="phone_number" class="block text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      pattern="[0-9]{10}"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter your Phone Number"
                      required
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="date-of-birth" class="block text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date-of-birth"
                      id="date-of-birth"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      max=""
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="gender" class="block text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                      required
                    >
                      <option value="" disabled selected>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="city" class="block text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter Your City"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="state" class="block text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter your State"
                      required
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="country" class="block text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter your Country"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="address" class="block text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter your Address"
                      required
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="message" class="block text-gray-700 mb-1">
                      Message
                    </label>
                    <input
                      type="text"
                      name="message"
                      id="message"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Enter your Message"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label class="mb-3 block text-gray-700 mb-1">
                      Request a counselling session
                    </label>
                    <div class="flex items-center space-x-6">
                      <div class="flex items-center hover:cursor-pointer">
                        <input
                          type="radio"
                          name="radio1"
                          id="radioButton1"
                          class="h-5 w-5"
                          required
                        />
                        <label
                          for="radioButton1"
                          class="pl-3 block text-gray-700 mb-1"
                        >
                          Yes
                        </label>
                      </div>
                      <div class="flex items-center hover:cursor-pointer">
                        <input
                          type="radio"
                          name="radio1"
                          id="radioButton2"
                          class="h-5 w-5"
                          required
                        />
                        <label
                          for="radioButton2"
                          class="pl-3 block text-gray-700 mb-1"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label for="cv_upload" class="block text-gray-700 mb-1">
                      Upload your CV/Resume
                    </label>
                    <input
                      type="file"
                      name="floating_email"
                      id="cv_upload"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer"
                      placeholder=""
                      accept=".pdf"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="mb-5 mt-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50"
                  required
                />
                <label
                  for="terms"
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  I agree with the{" "}
                  <a class="text-blue-600 underline">terms and conditions</a>
                </label>
              </div>

              <div class="mt-5">
                <button class="hover:shadow-form w-full rounded-md bg-teal-700 hover:bg-teal-600 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:cursor-pointer">
                  Submit Information
                </button>
              </div>
            </form>
            <div id="popup" class="hidden fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                  <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-green-600"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Form Submitted Successfully
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm leading-5 text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Autem mollitia inventore quod. Yay!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button
                        id="closePopup"
                        type="button"
                        class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-700 hover:bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        OK
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
