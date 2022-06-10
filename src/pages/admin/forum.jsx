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
import Posts from '../../components/UserManage/UserManage'
import {getall} from "@/request/topicAPI";
const { Header, Content, Sider } = Layout;


export default function Forum(){
    const [item,setItem]=useState([]);
    const [leftNav,setLeftNav]=useState([]);

    const history =useHistory();

        const handleClick=e=>{
           // console.log(leftNav[e.key].topicID);
            history.push('/forum/posts/'+leftNav[e.key].topicID)
        }
    useEffect(async () => {
      history.push('/forum/posts/0');
      let res=await getall();
      if (res.state===200){
          //leftNavInfo.push
          const leftNavInfo=res.data;
          console.log(leftNavInfo);
          setLeftNav(leftNavInfo);
          let items3 =leftNavInfo.map((a,key) => ({
              key,
              label: a.topicName,

          }));
          setItem(items3)
          //console.log(items3);
      }
  }, []);

        return(
            <div>

                <div className='admin-layout'><Layout>
                    <MyHeader />
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                onClick={handleClick}
                                mode="inline"
                                defaultSelectedKeys={['0']}
                                defaultOpenKeys={['sub1']}
                                style={{

                                    height: '100%',
                                    borderRight: 0,

                                }}
                                items={item}
                            />
                        </Sider>
                        <Layout
                            style={{
                                padding: '0 24px 24px',
                                height:"auto",
                                maxHeight:"2000px"
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
                                    <Route path="/forum/posts/:tid" component={Posts} />
                                    <Route path="/forum/follows/:mid" component={Audit} />

                                    <Route path="/forum/mypage" component={MyPage} />

                                    <Route path="/forum" component={this} />

                                </Switch>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout></div>
            </div>

        )
    }


