import React, { useState, useEffect } from 'react'
import axios  from 'axios';
import { List, Avatar, Space ,Input,Button,Modal, Tooltip,Select} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import {getall,get_by_tid,get_by_mid} from '@/request/topicAPI'
let input1=false;
let select='username';


export default function UserManage(props){
    //console.log(props);
    //console.log(props.location.search);
    //console.log(props.match.params.tid);

    const { Search } = Input;
    const { Option } = Select;
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [userInfo,setUserInfo]=useState({});
   // const [select,setSelect]=useState('');
    const user={
      "address": "0xbeAd993e565a5Cfa79Da88550Cf556992B87979c",
      "username": "user_beAd993e565a5Cfa79Da88550Cf556992B87979c",
      "avatar": "/img/user_logo.jpg",
      "sex": "女",
  }
    const history =useHistory();
    const handleChange=(selectedItems,option)=>{
      //setSelect(option.value)
      select=option.value;
      //console.log(select)
    }
    const selectBefore = (
      <Select defaultValue="username" className="select-before" onChange={handleChange}>
        <Option value="username">username</Option>
        <Option value="address">address</Option>
        <Option value="real_name">姓名</Option>
        <Option value="phone">手机号</Option>
      </Select>
    );


    useEffect(() => {
        get_by_tid({tid:props.match.params.tid})
            .then(res => {
                if(res.state===200){
                    //console.log(1);
                    /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
                    setData(res.data);
                }

            })
      }, [props.match.params.tid]);
    
        

const onSearch = value => {
  user[select]=value
  console.log(user)
  axios({
    method: 'post',
    url: 'http://114.55.119.223/prod-api/api/master/searchUserInfo',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token')
  },
  data:user,
    
})
    
    .then(res => {
       // console.log(res.data.data.userInfo)
        if(res.data.errCode===0){
            /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
            //setData(res.data.data.userInfo);
        }
      
    })
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


    return(
        <div>
        <Search addonBefore={selectBefore} placeholder="input search text" onSearch={onSearch} enterButton style={{maxWidth:'30%'}}/>
        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
       // console.log(page);
      },
      pageSize:6,
    }}
    dataSource={data}
    // footer={
    //   <div>
    //     <b>ant design</b> footer part
    //   </div>
    // }
    renderItem={item => (
      <List.Item

        extra={
            <span>{item.address}</span>
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={
            <a onClick={() => {
             history.push('/forum/follows/'+item.mpostID)
            //setVisible(true);
            //userInfo=JSON.parse(JSON.stringify(item));
           // setUserInfo(item)
          }}>
          {item.mpostTitle}
          </a>
        }
          description={item.real_name} 
        />
       {item.phone}  &nbsp;&nbsp;实名认证:{String(item.verified_status)} &nbsp;&nbsp;是否注册:{String(item.reg)}   &nbsp;&nbsp;level:{item.level}
      </List.Item>
     
    )}
  />
  
   </div>
    )
}