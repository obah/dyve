// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Academy {
  event StudentAdded(address indexed account, string indexed name, uint time);
  event StudentRemoved(address indexed account, string indexed name, uint time);

  error NotAStudent(address account);
  error OnlyOwner();
  error StudentExist(address account);

  address immutable OWNER;

  constructor () {
    OWNER = msg.sender;
  }

  struct StudentData {
    string name;
    uint dateJoined;
    bool isActive;
  }

  mapping(address => StudentData) student;

  function getStudent(address _student) external view returns (StudentData memory) {
    StudentData memory selectedStudent = student[_student];

    if(!selectedStudent.isActive) {
      revert NotAStudent(_student);
    }

    return selectedStudent;
  }

  function addStudent(string memory _name, address _student) external {
     StudentData memory selectedStudent = student[_student];

    if(selectedStudent.isActive) {
      revert StudentExist(_student);
    }

    selectedStudent.name = _name;
    selectedStudent.dateJoined = block.timestamp;
    selectedStudent.isActive = true;

    emit StudentAdded(_student, _name, block.timestamp);
  }

  function removeStudent(address _student) external {
    StudentData memory selectedStudent = student[_student];

    if(!selectedStudent.isActive) {
      revert NotAStudent(_student);
    }

    selectedStudent.isActive = false;
    
    emit StudentRemoved(_student, selectedStudent.name, block.timestamp);
  }
}