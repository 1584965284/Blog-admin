const Mock=require('mockjs');
let id=Mock.mock('@id')

Mock.mock('/user/login',{
    "state":200

})