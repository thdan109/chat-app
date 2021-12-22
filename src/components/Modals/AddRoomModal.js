import { Form, Input, Modal } from "antd";
import React from "react";
import  { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../Firebase/services";

export default function AddRoomModal (){

  const {isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
  const {user: { uid }} = React.useContext(AuthContext);
  const [form] = Form.useForm()

  const handleCancel = () =>{
    setIsAddRoomVisible(false)
     // reset form
    form.resetFields()
  }

  const handleOk = () =>{
    
    addDocument('rooms',{...form.getFieldValue(), members: [uid]})
    setIsAddRoomVisible(false);
    // reset form
    form.resetFields()
  }

  return(
    <Modal
      title="Tạo phòng"
      visible={isAddRoomVisible}
      onCancel={handleCancel}
      onOk={handleOk}
    > 
      <Form form={form} layout="vertical" >
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  )

}