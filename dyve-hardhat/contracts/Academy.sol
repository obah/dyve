// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Academy {
    event StudentAdded(address indexed account, string indexed name, uint time);
    event StudentRemoved(address indexed account, string indexed name, uint time);
    event CourseAdded(uint40 indexed courseId, string courseName, uint rewardAmount, uint time);
    event CourseEnrolled(address indexed student, uint40 courseId, uint enrollTime);
    event CourseCompleted(address indexed student, uint40 courseId, uint completedTime, bool rewarded);

    error NotAStudent(address account);
    error OnlyOwner();
    error StudentExists(address account);
    error AlreadyEnrolled(address student, uint courseId);
    error AlreadyRewardedForCourse(address student, uint courseId);
    error InsufficientFunds();
    error CourseNotFound(uint40 courseId);
    error CourseAlreadyExists(uint40 courseId);

    address immutable OWNER;
    address public rewardToken;
    uint constant REWARD_TIME_LIMIT = 30 days; // eligibility::: 30 days 

    struct StudentData {
        string name;
        uint dateJoined;
        bool isActive;
        uint40 coursesEnrolled;
        uint40 coursesCompleted;
    }

    struct Course {
        uint40 courseId;
        string courseName;
        uint rewardAmount; 
        bool isActive;
    }

    Course[] public allCourses;

    struct CourseData {
        uint enrollTime;
        bool isCompleted;
        bool isRewarded;
    }

    mapping(address => StudentData) public students; 
    mapping(address => mapping(uint40 => CourseData)) public enrolledCourses;
    mapping(uint40 => Course) public courses; 

    constructor(address _rewardToken) {
        OWNER = msg.sender;
        rewardToken = _rewardToken;
    }

    modifier onlyAdmin() {
        require(OWNER == msg.sender, "Unauthorized User");
        _;
    }

    receive() external payable {}

    function addCourse(uint40 _courseId, string memory _courseName, uint _rewardAmount) external onlyAdmin {
        if (courses[_courseId].isActive) {
            revert CourseAlreadyExists(_courseId);
        }

        courses[_courseId] = Course({
            courseId: _courseId,
            courseName: _courseName,
            rewardAmount: _rewardAmount,
            isActive: true
        });

        allCourses.push(courses[_courseId]);

        emit CourseAdded(_courseId, _courseName, _rewardAmount, block.timestamp);
    }

    function addStudent(string memory _name) external {
        StudentData storage selectedStudent = students[msg.sender];

        if (selectedStudent.isActive) {
            revert StudentExists(msg.sender);
        }

        selectedStudent.name = _name;
        selectedStudent.dateJoined = block.timestamp;
        selectedStudent.isActive = true;

        emit StudentAdded(msg.sender, _name, block.timestamp);
    }

    function addStudentByAdmin(string memory _name, address _student) external onlyAdmin {
        StudentData storage selectedStudent = students[_student];

        if (selectedStudent.isActive) {
            revert StudentExists(_student);
        }

        selectedStudent.name = _name;
        selectedStudent.dateJoined = block.timestamp;
        selectedStudent.isActive = true;

        emit StudentAdded(_student, _name, block.timestamp);
    }

    function courseEnroll(uint40 _courseId) external {
        StudentData storage selectedStudent = students[msg.sender];

        if (!selectedStudent.isActive) {
            revert NotAStudent(msg.sender);
        }

        Course storage selectedCourse = courses[_courseId];
        if (!selectedCourse.isActive) {
            revert CourseNotFound(_courseId);
        }

        // >>::: perfoms a check if the student has enrolled already in the course
        CourseData storage course = enrolledCourses[msg.sender][_courseId];

        if (course.isCompleted) {
            revert AlreadyEnrolled(msg.sender, _courseId);
        }

        // >>::: Enroll the student in the course and record the time
        enrolledCourses[msg.sender][_courseId] = CourseData({
            enrollTime: block.timestamp,
            isCompleted: false,
            isRewarded: false
        });

        selectedStudent.coursesEnrolled += 1;
        emit CourseEnrolled(msg.sender, _courseId, block.timestamp);
    }

    function completedCourse(address _student, uint40 _courseId) external onlyAdmin {
        StudentData storage selectedStudent = students[_student];

        if (!selectedStudent.isActive) {
            revert NotAStudent(_student);
        }

        CourseData storage course = enrolledCourses[_student][_courseId];

        require(!course.isCompleted, "Course already completed");

        if (course.isRewarded) {
            revert AlreadyRewardedForCourse(_student, _courseId);
        }

        Course storage selectedCourse = courses[_courseId];
        uint rewardAmount = selectedCourse.rewardAmount;

        // Checks if a course was completed in 30 days
        if (block.timestamp <= course.enrollTime + REWARD_TIME_LIMIT) {
            course.isCompleted = true;
            course.isRewarded = true;
            selectedStudent.coursesCompleted += 1;

            // Transfers reward to student
            if (IERC20(rewardToken).balanceOf(address(this)) >= rewardAmount) {
                IERC20(rewardToken).transfer(_student, rewardAmount); 
            } else {
                revert InsufficientFunds();
            }

            emit CourseCompleted(_student, _courseId, block.timestamp, true); 
        } else {
            course.isCompleted = true;
            emit CourseCompleted(_student, _courseId, block.timestamp, false); 
        }
    }

    function isStudentRegistered(address _student) external view returns (bool) {
        return students[_student].isActive;
    }

    function removeStudent(address _student) external onlyAdmin {
        StudentData storage selectedStudent = students[_student];

        if (!selectedStudent.isActive) {
            revert NotAStudent(_student);
        }

        selectedStudent.isActive = false;
        emit StudentRemoved(_student, selectedStudent.name, block.timestamp);
    }

    function getEnrolledCourses(address _student, uint40 _courseId) external view returns (CourseData memory) {
        return enrolledCourses[_student][_courseId];
    }

    function getTokenBalance() external view returns (uint256) {
        return IERC20(rewardToken).balanceOf(address(this));
    }

    function withdrawFunds(uint _amount) external onlyAdmin {
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(OWNER).transfer(_amount);
    }

    function getAllCourses() external view returns (Course[] memory) {
        return allCourses;
    }
}
