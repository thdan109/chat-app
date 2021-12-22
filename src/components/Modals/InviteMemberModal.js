import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { db } from "../../Firebase/config";
// import { addDocument } from "../../Firebase/services";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      onSearch={debounceFetcher}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      style={{ width: "100%" }}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.displayName?.chartAt(0).toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = React.useContext(AppContext);
  const [value, setValue] = React.useState();
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsInviteMemberVisible(false);
    // reset form
    form.resetFields();
  };

  const handleOk = () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsInviteMemberVisible(false);
    // reset form
    form.resetFields();
  };

  return (
    <Modal
      title="Mời thêm thành viên "
      visible={isInviteMemberVisible}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          lable="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
}
