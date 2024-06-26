 import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/NavBar/NavBar";
import { Tabs } from "flowbite-react";
import { TeacherInterface } from "../types/Types";
import axios from "axios";
import { Link } from "react-router-dom";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

type Props = {};

const Teachers = (props: Props) => {
  const [teachers, setTeachers] = useState([] as TeacherInterface[]);
  const [newTeacherData, setNewTeacherData] = useState({} as TeacherInterface);
  const [teacherCount, setTeacherCount] = useState(0);

  //------------------------------------------------------Get Teacher------------------------------------------------------
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/teachers");
        const count = res.data.length;
        setTeachers(res.data);
        setTeacherCount(count);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeachers();
  }, []);
  console.log(teachers);

//------------------------------------------------------Update Teacher------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeacherData(
      (prev: TeacherInterface) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }),
    );
    console.log(e.target.value);
  };

  const handleAddTeacher = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/teachers", newTeacherData);
      window.location.reload();
      console.log("Add Teacher");
    } catch (err) {
      console.log(err);
    }
  };


//------------------------------------------------------Delete Teacher------------------------------------------------------
  const handleDelete = async (teacherIndex: number) => {
    
    try {
      await axios.delete(`http://localhost:8000/teachers/${teacherIndex}`);
      window.location.reload();
      console.log("Delete Successfully");      
    } catch (error) {
      console.log("Error in delete teacher",  error);
    }
  };


  return (
    <div className="flex flex-row sm:flex overflow-visible">
      <div className=" place-items-start align-top items-center">
        <SideBar />
      </div>

      <div className="w-full left-84 max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl xl:max-w-screen-3xl ">
        <div>
          <NavBar handleSearch={(e) => console.log(e.target.value)} />
        </div>
        <div className="flex flex-row justify-between px-4">
        <h1 className="text-2xl px-2 py-4">Teachers </h1>
        <p className="mt-5 bg-yellow-200 py-2 px-4 border rounded-full">{`Total Teachers : ${teacherCount} `}</p>
        </div>
        
        <div className="px-2">
          
          <div>
            <Tabs>
              <Tabs.Item title="All Teachers">
                <div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher Full Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher Index
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teachers.map((teacher: TeacherInterface) => (
                        <tr key={teacher.idTeacher}>
                          <td className="px-6 py-4 whitespace-nowrap hover:underline cursor-pointer ">
                            <Link to={`/teacherDetail/${teacher.idTeacher}`}>
                            {teacher.teacherName}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {teacher.address}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {teacher.teacherIndex}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {teacher.contactNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text text-sm font-medium mr-4">
                            <button className="text-indigo-600 px-4 hover:text-indigo-900">
                              <Link
                                to={`/updateTeacher/${teacher.idTeacher}`} //--------------Edit student details----------------
                              >
                                Edit
                              </Link>
                            </button>
                            <button
                              className="ml-4 px-4 text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(teacher.teacherIndex)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Add New Teacher">
                Add{" "}
                <span className="font-medium text-gray-800 dark:text-white">
                  New Teacher
                </span>
                to the database
                <div className="grid grid-cols-4">
                  <form className="py-2">
                    <Label label="Teacher Full Name" />
                    <Label label="Teacher Index" />
                    <Label label="Contact Number" />
                    <Label label="Address" />
                    <Label label="Age" />
                    <Label label="Qusalification" />
                    <Label label="Teacher In Charge" />
                  </form>
                  <form className="py-2 my-2 gap-2">
                    <Input
                      type="text"
                      placeholder="Teacher Full Name"
                      name="teacherName"
                      label={""}
                      onchange={handleChange}
                    ></Input>
                    <Input
                      type="number"
                      placeholder="Teacher Index"
                      name="teacherIndex"
                      label={""}
                      onchange={handleChange}
                    />
                    <Input
                      type="number"
                      placeholder="Contact Number"
                      name="contactNumber"
                      label={""}
                      onchange={handleChange}
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      name="address"
                      label={""}
                      onchange={handleChange}
                    />
                    <Input
                      type="number"
                      placeholder="Age"
                      name="age"
                      label={""}
                      onchange={handleChange}
                    />
                    <Input
                      type="text"
                      placeholder="Qualification"
                      name="qualification"
                      label={""}
                      onchange={handleChange}
                    />
                    <Input
                      type="text"
                      placeholder="Teacher In Charge"
                      name="tic"
                      label={""}
                      onchange={handleChange}
                    />
                  </form>
                  <div className="col-span-4 py-2">
                    <Button onClick={handleAddTeacher} text="Add"></Button>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
