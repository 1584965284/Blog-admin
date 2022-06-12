import React,{Component,useState,useEffect}  from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './admin.less'
import './header/header.less'
import  '../../components/Audit/Audit.less'
import MyHeader from './header/Myheader'
import UserPage from '@/components/UserPage/UserPage';
import {useHistory,Route,Switch,useLocation} from 'react-router-dom'


import Audit from '../../components/Audit/Audit'
import MasterManage from '../../components/MasterManage/MasterManage'
import MyPage from '../../components/MyPage/MyPage'
import Posts from '../../components/UserManage/UserManage'
import {getall} from "@/request/topicAPI";
const { Header, Content, Sider } = Layout;


export default function Forum(props){
//data
    const [item,setItem]=useState([]);
    const [leftNav,setLeftNav]=useState([]);
    const [select,setSelect]=useState(["0"])

//hooks
    const history =useHistory();
    const location = useLocation();
    const { pathname } = location;
    //console.log(pathname);

        const handleClick=e=>{
           // console.log(leftNav[e.key].topicID);
            setSelect([e.key.toString()])
            history.push('/forum/posts/'+leftNav[e.key].topicID);
        }
    useEffect( () => {

        async function fun(){
            let nav=[];
           let res=  await getall();
            //console.log(res);
            if (res.state===200){
                //leftNavInfo.push
                const leftNavInfo=res.data;
               nav=res.data;
                //console.log(nav);
                setLeftNav(leftNavInfo);
                let items3 =leftNavInfo.map((a,key) => ({
                    key,
                    label: a.topicName,

                }));
                setItem(items3)
            }
            console.log(props);

            if(pathname==='/'){
                history.push("/forum");
            }else{
                history.push(pathname);
                //console.log(pathname.match(/\d{1}/));


                if(pathname.match(/\d{1}/)!=null){

                    setSelect([nav.findIndex(
                        (value)=>value.topicID==pathname.match(/\d/g).join('')
                    ).toString()
                    ])

                }
            }


        }

        fun();
  }, []);

        return(
            <div>

                <div className='admin-layout'>
                    <Layout>
                    <MyHeader />
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                onClick={handleClick}
                                mode="inline"
                                defaultSelectedKeys={['0']}
                                selectedKeys={select}
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
                                    <Route path="/forum/userPage/:uid" component={UserPage} />

                                    <Route path="/forum/MyPage" component={MyPage} />

                                    {/*<Route path="/forum" component={this} />*/}

                                </Switch>

                            </Content>
                        </Layout>
                    </Layout>
                </Layout></div>
            </div>

        )
    }


