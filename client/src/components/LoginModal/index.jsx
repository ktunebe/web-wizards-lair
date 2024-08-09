import { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import Login from './Login';
import Signup from './Signup';

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const formTabs = ['signup', 'login']
  const [activeKey, setActiveKey] = useState('signup')
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleFormTabClick = (key) => {
    setActiveKey(key)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={'60%'}
      >
         <Tabs
          defaultActiveKey="signup"
          type="card"
          size='large'
          onChange={handleFormTabClick}
          items={formTabs.map((tab) => {
            return {
              label: tab.toUpperCase(),
              key: tab,
              children: activeKey === 'signup' ? <Signup /> : <Login />,
            };
          })}
        />
      </Modal>
    </>
  );
};
export default LoginModal;

