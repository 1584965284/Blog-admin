import React, { useState, useEffect } from 'react';
import {useHistory,Route,Switch} from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { List, message, Avatar, Skeleton, Divider,Affix, Modal, Button,Input,Card} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';
let tID=0;
let ifButton=false;
let display=['block','block','block','block','block'];

/*!*/ 
export default function Audit(){
  
  const { Search,TextArea} = Input;
    const { Meta } = Card;
    const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [tokID,setTokId]=useState(1);
  const [aNFT,setANFT]=useState({});
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  const [inputData,setInputData]=useState({});

  //函数
  const onSearch = value => console.log(value);
  const getANFT=(tId)=>{
    //console.log(tId)
    axios({
      method: 'post',
      url: 'http://114.55.119.223/prod-api/api/market/getANFT',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
    },
      data:{tokenId:tId}
  }).then(res=>{setANFT(res.data.data.nft);
        setInputData(res.data.data.nft)
  })
}

const loadMoreData = () => {
  if (loading) {
    return;
  }
  setLoading(true);
  axios({
    method: 'get',
    url: 'http://114.55.119.223/prod-api/api/master/getNFTInfo',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token')
  },
    
})  
    .then(res => {
        //console.log(JSON.parse(res.data.data.NFTInfo))
        let i,j,x=0;

        let rowData=JSON.parse(res.data.data.NFTInfo);
        let dataSource=[];
        
        for(i=0;x<rowData.length;++i){
          let t=[];
          let to={data:[]}
          for(j=0;j<5;++j){
            if(x<rowData.length){
              t.push(rowData[x]);            
            }
            else{
              //t.push(rowData[0]);
              t.push(
                {empty:true,
                s3:'gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F08%2F20170808104131_i4TJ3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654200231&t=77915ddbc53cc89eb6c3371bd5cb79cd',
              });
            }
            x++;
          }
          /*to.data=t;
          dataSource.push(to);*/
          dataSource.push(t);
        }
       // console.log(dataSource)
      
        if(res.data.errCode==0){
            //setData(JSON.parse(res.data.data.NFTInfo));
            setData(dataSource);
            setLoading(false);
        }
      
    })
    .catch(() => {
      setLoading(false);
    });
};

useEffect(() => {
  //console.log(document.getElementById('modalButton'),'123')
  loadMoreData();
}, []);



    return(
        <div>
        <Modal
        title={aNFT.name}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
      >
      <a href={'http://'+aNFT.s3} target="_blank"><img alt="example" src={'http://'+aNFT.s3} className='NFTImg'/></a>
        <p></p>
        <p>{'tokenID：'+tokID} &nbsp;&nbsp;&nbsp;&nbsp;<span>{'等级：'+aNFT.level}</span></p>
        
        <p>{'作者：'+aNFT.author} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{'价格：'+aNFT.price}</span></p>
       
        
       <div className='hidden' id='up'><br />
       修改作品名称：&nbsp;<TextArea  rows={3} maxLength={33} disabled={disabled} placeholder={aNFT.name} style={{width:'70%',height:'15px',display:'none !important'}} value={inputData.name} onChange={(a)=>{let d={...inputData};d.name=a.target.value; setInputData(d); } }/>
        <br /><br/>
       </div> 
         标签：&nbsp;
        
        <TextArea rows={3} maxLength={99} disabled={disabled} placeholder={aNFT.labels} style={{width:'70%',height:'15px'}} value={inputData.labels} onChange={(a)=>{let d={...inputData};d.labels=a.target.value; setInputData(d); } }/>
      <br />
      <br />  作品说明：&nbsp;
      <TextArea rows={2} maxLength={999} disabled={disabled} placeholder={aNFT.description} style={{width:'70%'}} value={inputData.description} onChange={(a)=>{let d={...inputData};d.description=a.target.value; setInputData(d); } }/>
      
        <p></p>
        
        <Button type="primary" onClick={
          ()=>{
           
            axios({
              method: 'post',
              url: 'http://114.55.119.223/prod-api/api/master/passNFT',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
             data:{
               tokenId:tokID
             }
          }).then(res=>{
            if(res.data.errCode==0){
              setVisible(false);
            window.location.reload();
            }
            else{
              console.log('wrong')
            }
          })
            
          }
        }>
        通过审核
      </Button>
      <Button className='dismissNFT' danger onClick={
        ()=>{
           
          axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/master/dismissNFT',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
           data:{
             tokenId:tokID
           }
        }).then(res=>{
          if(res.data.errCode==0){
            setVisible(false);
          window.location.reload();
          }
          else{
            console.log('wrong')
          }
        })
          
        }
      }>
        驳回审核
      </Button>
      <Button type="primary" style={{display:"none"}} id='modalButton' onClick={() => {
        console.log(inputData)
        axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/master/changeNFTInfo',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
          data:{tokenId:tokID,
            name:inputData.name,
            description:inputData.description,
            labels:inputData.labels,
          }
      }).then(
        res=>{
          window.location.reload()
        }
      )

      }}>
        修改
      </Button>

      </Modal>

        <div
      id="scrollableDiv"
      style={{
        height: 850,
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
      <Search placeholder="input search text" onSearch={onSearch} enterButton style={{maxWidth:'25%'}}/>
        <List 
          dataSource={data}
          renderItem={item => (
            <List.Item >
              <List.Item.Meta/>
              <div><Card
              onClick={() => {if(item[0].empty==true){return}tID=item[0].tokenId;setTokId(item[0].tokenId);getANFT(item[0].tokenId);setVisible(true);}}
              className='NFTCard'
              hoverable
              style={{display:display[0]}}
              cover={<img alt="无此NFT，仅占位" src={'http://'+item[0].s3} referrer="no-referrer" className='NFTImg'/>}
            >
              <Meta title={item[0].name} description={item[0].author} />
            </Card>
            <Card
            onClick={() => {if(item[1].empty==true){return}tID=item[1].tokenId;setTokId(item[1].tokenId);getANFT(item[1].tokenId);setVisible(true);}}
            className='NFTCard'
              hoverable
              style={{display:display[1]}}
              cover={<img alt="无此NFT，仅占位" src={'http://'+item[1].s3} className='NFTImg'/>}
            >
              <Meta title={item[1].name} description={item[1].author} />
            </Card>
            <Card
             onClick={() => {if(item[2].empty==true){return}tID=item[2].tokenId;setTokId(item[2].tokenId);getANFT(item[2].tokenId);setVisible(true);}}
            className='NFTCard'
              hoverable
              style={{display:display[2]}}
              cover={<img alt="无此NFT，仅占位" src={'http://'+item[2].s3} className='NFTImg'/>}
            >
              <Meta title={item[2].name} description={item[2].author} />
            </Card>
            <Card
            onClick={() => {if(item[3].empty==true){return}tID=item[3].tokenId;setTokId(item[3].tokenId);getANFT(item[3].tokenId);setVisible(true);}}
            className='NFTCard'
              hoverable
              style={{display:display[3]}}
              cover={<img alt="无此NFT，仅占位" src={'http://'+item[3].s3} className='NFTImg'/>}
            >
              <Meta title={item[3].name} description={item[3].author} />
            </Card>
            <Card
            onClick={() => {if(item[4].empty==true){return}tID=item[4].tokenId;setTokId(item[4].tokenId);getANFT(item[4].tokenId);setVisible(true);}}
            className='NFTCard'
              hoverable
              style={{display:display[4]}}
              cover={<img alt="无此NFT，仅占位" src={'http://'+item[4].s3} className='NFTImg'/>}
            >
              <Meta title={item[4].name} description={item[4].author} />
            </Card>
            
            </div>
            </List.Item>
          )}
        />
      <Affix offsetBottom={bottom}>
        <Button type="default"  onClick>
          批量审核
        </Button>
        <Button type="default" style={{'marginLeft':'50px'}} onClick={()=>{
          setDisabled(false);
          document.getElementById('up').className='notHidden';
          document.getElementById('modalButton').style+='visibility:visible;';
        }}>
          切换为修改NFT模式
        </Button>

      </Affix>
      
      </InfiniteScroll>
    </div>
         
        </div>
    )
}