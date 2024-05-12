import React from 'react';
import { Layout, Menu, Button, Row, Col, Card, Typography, Input } from 'antd';
import { UserOutlined, CalendarOutlined, DollarOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

function Home() {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">HOME</Menu.Item>
          <Menu.Item key="2">SHOP</Menu.Item>
          <Menu.Item key="3">ABOUT</Menu.Item>
          <Menu.Item key="4">BUYERS</Menu.Item>
          <Menu.Item key="5">CONTACT</Menu.Item>
          <Menu.Item key="6" style={{ float: 'right' }}>Log Out</Menu.Item>
          <Menu.Item key="7" style={{ float: 'right' }}>Ravindu</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<UserOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<DollarOutlined />}>Earnings</Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>Calendar</Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>Your Details</Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>Settings</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {/* Main content and illustration */}
            <Row gutter={16}>
              <Col span={16}>
                {/* Illustration and motto here */}
                <Title level={4}>Let’s Keep Our Environment Clean</Title>
                {/* Placeholder for illustration */}
              </Col>
              <Col span={8}>
                <Card>
                  <Button type="primary" block> Schedule Pickup </Button>
                  <Button block> View Ratings </Button>
                </Card>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Text>EcoLITE ©2023 For Clean and Calm Environment</Text>
            {/* Contact and social links here */}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Home;