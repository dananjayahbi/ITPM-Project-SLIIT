// import React, { useState } from 'react';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import {
//   DesktopOutlined,
//   UserOutlined,
//   TeamOutlined,
//   FileOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import AllSellers from '../Seller/AllSellar';
// import AdminDashboardView from '../Admin/AdminDashboardView';

// const { Header, Content, Sider } = Layout;

// const menuItems = [
//   { key: '1', icon: <PieChartOutlined />, label: 'Dashboard', path: '/dashboard' },
//   { key: '2', icon: <UserOutlined />, label: 'Create Seller', path: '/create-seller' },
//   { key: '3', icon: <UserOutlined />, label: 'All Sellers', path: '/all-sellers' },
//   { key: '4', icon: <UserOutlined />, label: 'Create Company', path: '/create-company' },
//   { key: '5', icon: <UserOutlined />, label: 'All Company', path: '/all-company' },
//   { key: '6', icon: <TeamOutlined />, label: 'Add Bin', path: '/team1' },
//   { key: '7', icon: <TeamOutlined />, label: 'All Bins', path: '/team2' },
//   { key: '8', icon: <FileOutlined />, label: 'File Settings', path: '/file-settings' },
// ];

// const AdminDashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState('1');

//   const handleMenuClick = (e) => {
//     setSelectedMenuItem(e.key);
//   };

//   const getBreadcrumbItems = () => {
//     const selectedItem = menuItems.find((item) => item.key === selectedMenuItem);
//     if (!selectedItem) return null;

//     const breadcrumbItems = [
//       <Breadcrumb.Item key={selectedItem.key} href={selectedItem.path}>
//         {selectedItem.icon}
//         <span>{selectedItem.label}</span>
//       </Breadcrumb.Item>,
//     ];

//     return breadcrumbItems;
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//         <div className="logo" />
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
//           {menuItems.map((item) => (
//             <Menu.Item key={item.key} icon={item.icon}>
//               {item.label}
//             </Menu.Item>
//           ))}
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//         <Header className="site-layout-background" style={{ padding: 0 }} />
//         <Content style={{ margin: '0 16px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item href="">
//               <DesktopOutlined />
//               <span>Home</span>
//             </Breadcrumb.Item>
//             {getBreadcrumbItems()}
//           </Breadcrumb>
//           <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
//             {selectedMenuItem === '3' && <AllSellers />}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  PieChartOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import AllSellers from '../Seller/AllSellar';
import AdminDashboardView from '../Admin/AdminDashboardView';

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: '1', icon: <PieChartOutlined />, label: 'Dashboard', path: '/dashboard', component: <AdminDashboardView /> },
  { key: '2', icon: <UserOutlined />, label: 'Create Seller', path: '/create-seller' },
  { key: '3', icon: <UserOutlined />, label: 'All Sellers', path: '/all-sellers' },
  { key: '4', icon: <TeamOutlined />, label: 'Create Company', path: '/create-company' },
  { key: '5', icon: <TeamOutlined />, label: 'All Company', path: '/all-company' },
  { key: '6', icon: <DeleteOutlined />, label: 'Add Bin', path: '/team1' },
  { key: '7', icon: <DeleteOutlined />, label: 'All Bins', path: '/team2' },
  { key: '8', icon: <FileOutlined />, label: 'File Settings', path: '/file-settings' },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const getBreadcrumbItems = () => {
    const selectedItem = menuItems.find((item) => item.key === selectedMenuItem);
    if (!selectedItem) return null;

    const breadcrumbItems = [
      <Breadcrumb.Item key={selectedItem.key} href={selectedItem.path}>
        {selectedItem.icon}
        <span>{selectedItem.label}</span>
      </Breadcrumb.Item>,
    ];

    return breadcrumbItems;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item href="">
              <DesktopOutlined />
              <span>Home</span>
            </Breadcrumb.Item>
            {getBreadcrumbItems()}
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {selectedMenuItem === '1' && <AdminDashboardView />}
            {selectedMenuItem === '3' && <AllSellers />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

