import React, { useState, useRef, useEffect } from "react";

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search({ setError, resetError, setStudents, studentList, studentsFromDb  }) {
  const [student, setStudent] = useState({ name: null, date: null });
  const inputName = useRef(null);
  // const inputDate = useRef(null);

  const validateStudent = () => {
    if (!inputName.current.value) {
      setError({
        status: true,
        message: "Name Not Entered. Please Enter a name",
      });
      return;
    }
    // if (!inputDate.current.value) {
    //   setError({
    //     status: true,
    //     message: "Date Not Entered. Please Enter a valid Date",
    //   });
    //   return;
    // }
    const currentStudent = {
      name: inputName.current.value,
      // date: inputDate.current.value,
    };
    const validStudent = studentsFromDb.filter(
      (std) =>
        currentStudent.name.toLowerCase() === std.username.toLowerCase()
    );
    if (validStudent.length === 0) {
      setError({
        status: true,
        message: `Sorry, ${currentStudent.name} is not a verified student!`,
      });
      return;
    }
  
    setStudent(validStudent[0]);
    resetError();
	// inputDate.current.value = "";
	inputName.current.value = "";
  };

  useEffect(() => {
    if (!student.name) return;
    setStudents([...studentList, student]);
  }, [student]);

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Enter a username from: <a href="https://jsonplaceholder.typicode.com/users/" target="_blank">Users List</a>
        <div>
          <input
            ref={inputName}
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
          />
        </div>
      </label>
      {/* <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            ref={inputDate}
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
          />
        </div>
      </label> */}
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={validateStudent}
      >
        Add
      </button>
    </div>
  );
}

export default Search;
