import React, { useEffect, useState } from "react";

function ResidentsList({ studentList }) {
  return (
    <div className="pa-10 mt-10 w-75">
      <div className="font-weight-bold text-center">Residents List</div>
      <ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
        {studentList.map((student) => {
          return (
            <li key={`item-${student.name}`} className="slide-up-fade-in">
              {student.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResidentsList;
