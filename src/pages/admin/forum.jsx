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
import MPost from '@/components/MPost/MPost'
import FPost from '@/components/FPost/FPost'
import Topic from '@/components/Topic/Topic'
import {getall} from "@/request/topicAPI";
const { Header, Content, Sider } = Layout;

const menu=["mpost","fpost","user","topic"]
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
            history.push('/'+menu[e.key]);
        }
    useEffect( () => {

        async function fun(){
            let nav=["主帖管理","跟帖管理","用户管理","版面管理"];
           
                const leftNavInfo=nav;
                setLeftNav(leftNavInfo);
                let items3 =leftNavInfo.map((a,key) => ({
                    key,
                    label: a,

                }));
                setItem(items3);
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

                                    <Route path="/mpost" component={MPost} />
                                    <Route path="/fpost" component={FPost} />
                                    <Route path="/user" component={UserPage} />
                                    <Route path="/topic" component={Topic} />

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


