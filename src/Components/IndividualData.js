import React from 'react'

export const IndividualData = ({individualData}) => {
  return (
    <div>
      {/* <p>{index}</p> */}
      <p>Name : {individualData.Name}</p>
      <p>Surname: {individualData.Surname}</p>
      <p>Age: {individualData.Age}</p>
      <p>Gender: {individualData.Gender}</p>
      <p>Address: {individualData.Address}</p>
      <p>MobileNo: {individualData.MobileNo}</p>
    </div>
  )
}
