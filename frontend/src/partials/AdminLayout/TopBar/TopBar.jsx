// import React from 'react';
// import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   BellOutlined,
// } from '@ant-design/icons';
// import 'antd/dist/antd.css';
// import './topbar.css';

// const { Header } = Layout;

// const menu = (
//   <Menu>
//     <Menu.Item key="1">Profile</Menu.Item>
//     <Menu.Item key="2">Settings</Menu.Item>
//     <Menu.Item key="3">Logout</Menu.Item>
//   </Menu>
// );

// const TopBar = ({ collapsed, toggle }) => {
//   return (
//     <Header className="top-bar">
//       {collapsed ? (
//         <MenuUnfoldOutlined className="trigger" onClick={toggle} />
//       ) : (
//         <MenuFoldOutlined className="trigger" onClick={toggle} />
//       )}
//       <div className="right-menu">
//         <Button icon={<BellOutlined />} />
//         <Dropdown overlay={menu}>
//           <Button>
//             <Avatar icon={<UserOutlined />} />
//           </Button>
//         </Dropdown>
//       </div>
//     </Header>
//   );
// };

// export default TopBar;