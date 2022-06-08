import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider,Affix,Popover,Button,Modal,Input, Tooltip} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios  from 'axios';
  
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


export default function MasterManage(){
        
        const content = (
        <div>
            <p>更改管理员</p>
            
        </div>
        );
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);
        const [visible, setVisible] = useState(false);
       const [state,setState]=useState({
            clicked: false,
            hovered: false,
          })
          const [top, setTop] = useState(10);
          const [bottom, setBottom] = useState(10); 
          
        const loadMoreData = () => {
          if (loading) {
            return;
          }
          setLoading(true);
          //fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
          axios({
            method: 'get',
            url: 'http://114.55.119.223/prod-api/api/master/getAdminInfo',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
            
        })
            
            .then(res => {
                //console.log(JSON.parse(res.data.data.adminInfo))
                if(res.data.errCode==0){
                    /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
                    setData(JSON.parse(res.data.data.adminInfo));
                    
                    setLoading(false);
                }
              
            })
            .catch(() => {
              setLoading(false);
            });
        };
      
        useEffect(() => {
          loadMoreData();
        }, []);

    return(
        <div
        id="scrollableDiv"
        style={{
          height: 900,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length>20}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >

        <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>

          <List
            dataSource={data}
            renderItem={item => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  //avatar={<Avatar src={item.picture.large} />}
                  title={
                    <span>
                    <Popover  content={content}>

                  <a href="#" onClick={() => setVisible(true)}>{item.name}  </a> 

                  </Popover> </span> 
                }
                  description={'address: '+item.address}
                  style={{
                      height:'100px',
                  }}
                />
                <div>{'权限等级：'+item.level}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>


       
      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick>
          添加管理员
        </Button>
      </Affix>

      </div>
    )
}



          
       



      /*   <span>
                    <Popover  content={content}>

                  <a href="#">{item.name}  </a> 

                  </Popover> </span> */