import React,{Component,useState,useEffect}  from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './admin.less'
import './header/header.less'
import  '../../components/Audit/Audit.less'
import MyHeader from './header/Myheader'
import {useHistory,Route,Switch} from 'react-router-dom'

import Audit from '../../components/Audit/Audit'
import MasterManage from '../../components/MasterManage/MasterManage'
import MyPage from '../../components/MyPage/MyPage'
import UserManage from '../../components/UserManage/UserManage'
const leftNavPage=['audit','userm','masterm']
const { Header, Content, Sider } = Layout;

  
  const leftNavInfo=['NFT审核','用户管理','管理员任免'];
  const items3 = ['1', '2', '3'].map((key) => ({
    key,
    label: leftNavInfo[key-1],
    
  }));
  
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

export default function Admin(){ 
  

        const history =useHistory()
        const handleClick=e=>{
            history.push('/admin/'+leftNavPage[e.key-1])
        }
    useEffect(() => {
      history.push('/admin/audit')
  }, []);

        return(
            <div className='admin-layout'><Layout>
    <MyHeader />
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          onClick={handleClick}
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{

            height: '100%',
            borderRight: 0,
            
          }}
          items={items3}
        />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        
        <Content
          className="site-layout-background"
          style={{
            padding: 10,
            margin: '10px 0',
            minHeight: 280,
          }}
        >
        <Switch>
            <Route path="/admin/audit" component={Audit} />
            <Route path="/admin/masterm" component={MasterManage} />
            <Route path="/admin/userm" component={UserManage} />

            <Route path="/admin/mypage" component={MyPage} />
            <Route path="/admin" component={this} />
            
        </Switch>
          
        </Content>
      </Layout>
    </Layout>
  </Layout></div>
        )
    }


