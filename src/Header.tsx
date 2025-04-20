import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined, HomeOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home' },
    { key: 'About', icon: <InfoCircleOutlined />, label: 'About' },
    { key: 'Contact', icon: <MailOutlined />, label: 'Contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-950/80 to-blue-900/80 backdrop-blur-sm text-white p-4 sm:p-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold animate-fade-in">MovieHub</h1>
        <div className="hidden md:flex space-x-6">
 
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={`/${item.key}`}
              className="text-white hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
        
          ))}
        
        </div>
        <Button
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setDrawerVisible(false)}
          className="border-none"
        />
      </Drawer>
    </header>
  );
};

export default Header;