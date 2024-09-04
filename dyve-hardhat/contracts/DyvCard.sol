// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DyvCard {
  event DyvCardCreated(address indexed owner, string certificationName, uint256 indexed dyvId);

  error OnlyOwner();

  address immutable OWNER;

  constructor(){
    OWNER = msg.sender;
  }

  struct CertificationCard {
    uint256 dyvId;
    uint256 dateCreated;
    string certificationId;
    string certificationName;
    string certificationDate;
    string ownerName;
  }

  uint256 counter;
  string[] public dyvIds;
  mapping(address => CertificationCard[]) userCertificates;

  function addCard (
    address _student,
    string memory _certId,
    string memory _certName,
    string memory _certDate,
    string memory _ownerName
    ) external {
    if(msg.sender != OWNER) {
      revert OnlyOwner();
    }

    CertificationCard[] storage userCards = userCertificates[_student]; 
    uint256 id;

    if(userCards.length < 1){
      id = generateId();
    } else {
      id = userCards[0].dyvId;
    }

    userCards.push(CertificationCard({
      dyvId: id,
      dateCreated: block.timestamp,
      certificationId: _certId,
      certificationName: _certName,
      certificationDate: _certDate,
      ownerName: _ownerName
    }));

    emit DyvCardCreated(_student, _certName, id);

  }

  function fetchCard(address _student) external view returns(CertificationCard[] memory){
    return userCertificates[_student];
  }

  function getYear() internal view returns(uint16) {
    uint256 currentTime = block.timestamp;

    uint256 SECONDS_PER_DAY = 24 * 60 * 60;
    uint256 OFFSET1970 = 1970;

    uint256 leapYears = (currentTime / 52 weeks + OFFSET1970 - 1) / 4 - (OFFSET1970 - 1) / 4;

    uint256 year = OFFSET1970 + currentTime / 52 weeks;

    if ((currentTime % 52 weeks) < (leapYears * SECONDS_PER_DAY)) {
      year -= 1;
    }

    return uint16(year);
  }

  function generateId() internal returns(uint256 id_){
    id_ = getYear() + counter;
    counter = counter + counter;
  }
}