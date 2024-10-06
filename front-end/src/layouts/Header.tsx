import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Input, message } from 'antd';
import { login } from '../redux/slices/authSlice'; // Import login action
import { RootState, AppDispatch } from '../redux/store'; // Import AppDispatch
import useLogout from '../redux/hooks/useLogout'; // Import useLogout hook

const Header: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const handleLogout = useLogout(); // Use useLogout hook

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: { accountName: string; accountPass: string }) => {
    try {
      await dispatch(login(values)).unwrap(); 
      message.success('Đăng nhập thành công');
      setIsModalVisible(false);
    } catch {
      message.error('Đăng nhập thất bại');
    }
  };

  return (
    <header className="bg-custom-navy-dark h-16 text-white font-bold">
      <div className="flex justify-between h-full">
        <div className=""></div>
        <div className="p-4">IT Devices Management</div>
        <div className="bg-orange-500 p-4">
          {isAuthenticated ? (
            <>
              <Button className='font-bold text-white' type="link" onClick={handleLogout}>
                Đăng Xuất
              </Button>
            </>
          ) : (
            <Button className='font-bold text-white' type="link" onClick={showModal}>
              Đăng Nhập
            </Button>
          )}
        </div>
      </div>
      <Modal title="Đăng Nhập" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="accountName"
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
          >
            <Input placeholder="Tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="accountPass"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
};

export default Header;