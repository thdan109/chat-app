import { Col, Row } from 'antd'
import React from 'react'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'

export default function ChatRoom (){
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />       
        </Col>
        <Col span={18}>
          <ChatWindow/>
        </Col>
      </Row>
    </div>
  )
}