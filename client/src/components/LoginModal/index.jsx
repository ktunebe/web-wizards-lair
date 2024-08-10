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

  const handleCancel = () => {
    setOpen(false);
  };
  const handleFormTabClick = (key) => {
    setActiveKey(key)
  }
  return (
    <>
    {/* Button for Modal - absolute positioned because it will sit in the middle of the door on main page */}
      <Button 
        type="primary" 
        danger 
        onClick={showModal}
        className={'text-dark font-bold mb-2 absolute-middle'}
      >
        Log in or Sign Up to Enter
      </Button>
      {/* Login/signup Modal */}
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={'60%'}
        className="custom-modal"
      >
      {/* Tabs to toggle between log in and sign up */}
         <Tabs
          defaultActiveKey="signup"
          type="card"
          size='large'
          tabBarGutter={200}
          // tabPosition='left'
          centered
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

