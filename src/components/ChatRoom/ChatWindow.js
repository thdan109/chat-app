import { UserAddOutlined } from "@ant-design/icons";
import { Button, Tooltip, Avatar, Input, Form, Alert } from "antd";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../Firebase/services";
import useFirestore from "../../hooks/useFirestore";
import InviteMemberModal from "../Modals/InviteMemberModal";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { members, selectedRoom, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, displayName, photoURL },
  } = React.useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState();
  const [form] = Form.useForm();
  // const selectedRoom = React.useMemo(
  //   () => rooms.find((room) => room.id === selectedRoomId),
  //   [rooms, selectedRoomId]
  // )

  // console.log(members);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(["input"]);
  };

  const condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirestore("messages", condition);
    console.log(messages);
  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <InviteMemberModal />
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__description">
                {selectedRoom?.description}
              </span>
            </div>
            <div>
              <ButtonGroupStyled>
                <Button
                  icon={<UserAddOutlined />}
                  type="text"
                  onClick={() => setIsInviteMemberVisible(true)}
                >
                  Mời
                </Button>
                <Avatar.Group size="small" maxCount={2}>
                  {members.map((member) => (
                    <Tooltip title={member.dislayName} key={member.id}>
                      <Avatar src={member.photoURL}>
                        {member.photoURl
                          ? ""
                          : member.dislayName?.chartAt(0)?.tuUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </ButtonGroupStyled>
            </div>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="input">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhắn..."
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Chọn phòng đê"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
}
