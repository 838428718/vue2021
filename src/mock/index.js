const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://10.162.98.161:3000/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const postData = () => {
  let posts = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    let post = {
      id:Random.string('lower', 10),
      title: Random.ctitle(15), // 随机生成长度为10-25的标题
      icon: Random.dataImage('600x400', '假装有图片'), // 随机生成大小为250x250的图片链接
      author: Random.cname(), // 随机生成名字
      time: Random.now("month",'yyyy-MM-dd'), // 随机生成年月日 + 时间
      content:Random.cparagraph()
    }

    posts.push(post)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
}

const patentData = () => {
  let patents = [] // 用于存放文章数据的数组

  for (let i = 0; i < 10; i++) {
    let patent = {
      id:Random.string('lower', 10),
     name: Random.ctitle(10), // 随机生成长度为10-25的标题
      Image: Random.dataImage('600x400', '假装有图片'), // 随机生成大小为250x250的图片链接
      inventor: Random.cname(), // 随机生成名字
      applyTime: Random.now("month",'yyyy-MM-dd'), // 随机生成年月日 + 时间
      authorizeTime: Random.now("month",'yyyy-MM-dd'), // 随机生成年月日 + 时间
      licenceNumber:Random.string('number', 10),
      patentNumber:Random.string('number', 10),


     
    }

    patents.push(patent)
  }

  // 返回状态码和文章数据posts
  return {
    code,
    patents
  }
}




// 定义请求链接，类型，还有返回数据
Mock.mock(`${domain}/post`, 'get', postData);
Mock.mock(`${domain}/zhuanli`, 'get', patentData);