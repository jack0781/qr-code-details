import React, {useState, useRef} from 'react'
import axios from 'axios'
import QRCode from 'qrcode.react'
import { Form,Input, Button } from 'antd';
const FormItem = Form.Item;

function UserForm() {
  // form states
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [surname, setSurname] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [qrCodeData, setQRCodeData] = useState('')
  // retrived data state
  const qrCodeRef = useRef(null)

  // submit event
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, surname, age, gender, address, mobile)

    // our object to pass
    const data = {
      Name: name,
      Surname: surname,
      Age: age,
      Gender: gender,
      Address: address,
      MobileNo: mobile,
    }
    axios
      .post(
        'https://sheet.best/api/sheets/3d7c7969-9b37-4262-b84b-3b8a117f947c',
        data,
      )
      .then((response) => {
        const webAppURL = 'https://barcodetodetails.netlify.app/' // Replace with your web app URL
        const qrData = JSON.stringify(response.data)
        const userInfoURL = `${webAppURL}information?user=${encodeURIComponent(
          qrData,
        )}`
        setQRCodeData(userInfoURL)
        setName('')
        setAge('')
        setSurname('')
        setGender('')
        setAddress('')
        setMobile('')
      })
  }

  const downloadQRCodeAsImage = () => {
    const canvasElement = qrCodeRef.current.querySelector('canvas')

    if (canvasElement) {
      // Convert the canvas to a data URL (PNG format)
      const dataURL = canvasElement.toDataURL('image/png')

      // Create an anchor element to trigger the download
      const downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = 'qrcode.png' // Set the filename
      downloadLink.click()
    }
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  return (
    <div className="container">
      <br></br>
      <br></br>
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
      <h1>Fill your details to generate barcode</h1>
      <FormItem {...formItemLayout} label="Name">
              <Input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name}/>
      </FormItem>
      <FormItem {...formItemLayout} label="Surname">
              <Input placeholder="Enter your surname"onChange={(e) => setSurname(e.target.value)} value={surname}/>
      </FormItem>
      <FormItem {...formItemLayout} label="Age">
              <Input placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} value={age}/>
      </FormItem><FormItem {...formItemLayout} label="Gender">
              <Input placeholder="Enter gender" onChange={(e) => setGender(e.target.value)} value={gender}/>
      </FormItem><FormItem {...formItemLayout} label="Address">
              <Input placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} value={address}/>
      </FormItem>
      <FormItem {...formItemLayout} label="Mobile No">
              <Input placeholder="Enter Name" onChange={(e) => setMobile(e.target.value)} value={mobile}/>
      </FormItem>
      <Button type="primary" htmlType="submit">Submit</Button>
    </form>
       
      {qrCodeData && (
        <div>
          <h2>QR Code</h2>
          <div ref={qrCodeRef}>
            <QRCode value={qrCodeData} />
            <Button style={{marginLeft:"30px"}} type="primary" onClick={downloadQRCodeAsImage}>Download QR Code</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserForm
