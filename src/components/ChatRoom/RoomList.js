import { Button, Collapse, Typography } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import styled from "styled-components";
import {PlusSquareOutlined} from '@ant-design/icons';
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import AddRoomModal from "../Modals/AddRoomModal";

const PaneStyled = styled(CollapsePanel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`

export default function RoomList() {
  // const { user: {uid}} = React.useContext(AuthContext);
  
  // const  roomsCondition = React.useMemo(()=>{
  //   return {
  //     fieldName:  'members',
  //     operator: 'array-contains',
  //     compareValue: uid
  //   }
  // },[uid])

  // const rooms = useFirestore('rooms', roomsCondition)
  
 
  
  const {rooms,setIsAddRoomVisible, setSelectedRoomId} = React.useContext(AppContext)
  const handleAddRoom = () =>{
    setIsAddRoomVisible(true)
  }
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PaneStyled header="Danh sách các phòng" key="1">
        {
          rooms.map((room) => <LinkStyled key={room.id} onClick={()=>setSelectedRoomId(room.id)}>{room.name}</LinkStyled> )
        }
        <Button className="add-room" type="text" icon={<PlusSquareOutlined />} onClick={handleAddRoom}>Thêm Phòng</Button>
      </PaneStyled>
      <AddRoomModal/>
    </Collapse>
  );
}
