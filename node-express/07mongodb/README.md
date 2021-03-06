## 安装
## 启动
  - mongod --dbpath (url)
  - mongo 启动本地数据库

## 远程连接数据库  
  - mongo：127.0.0.1:27017

## 查看有哪些数据库
  - show dbs

## 进入 或者创建 admin 数据库
  - use admin 

## 创建一个 user 得表 并且插入一条数据 或者 插入一条数据
 - db.user.insert({"name": "qiao"})

## 查看 数据库中 有哪些 表 
  - show collections

## 查看 admin 表中 的 数据
  - db.admin.find() 

  - name='xiao' && age = 18
    - db.admin.find({nsmr: 'xiao', agr: '18'})

  -  模糊查找
    - db.admin.find({"name": /xi/})
    - db.admin.find({"name": /^xi/)

  - age > 18
    - db.admin.find({"age": {$gt: 18}})
  - age >= 18
    - db.admin.find({"age": {$gte: 18}})

  - age < 18
    - db.admin.find({"age": {$lt: 18}})
  - age <= 18
    -  db.admin.find({"age": {$lte: 18}})

  - age >= 24 && age<= 30
    - db.admin.find({'age': {$gte: 24, $lte: 30}})

  - 指定列 查找 --- name 字段
    - db.admin.find({}, {'name': 1})  

  - 排序查找 --- 以age 来进行 升序查找  -1 降序
    - db.admin.find({}).sort('age': 1)

  - 前 5 条 数据
    - db.admin.find().limit(5)

  - 越过前5 条 查 后5 条数据
    -db.admin.find().skip(5).limit(5)

  - or 或者  -- > age=24 || age = 23
    - db.admin.find({$or: [{age: 24}, {age: 23}]})

  - 查询 记录的 总数
    - db.admin.find().count()
  
  
## 删除 集合admin
  - db.admin.drop()

## 删除当前数据库
  - db.dropDatabase()

## 修改数据
  - 查找名字叫做xiaoqiao的，把年龄更改为 16 岁：
    - db.admin.update({"name": "xiaoqiao"},{$set: {"age": "16"}})
    -  注意 完整替换，不出现$set 关键字了：
      - db.student.update({"name":"小明"},{"name":"大明","age":16});

    

## 删除数据
    - db.admin.remove({"name": "xiaoqiao"})
    - 只删除一条
      - db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )

## 索引
  - 创建
    - db.user.ensureIndex({"username":1})
  
  - 获取当前集合的索引：
    - db.user.getIndexs()

  - 删除索引
    - db.user.dropIndex({'name': 1})

  - 复合索引
    - db.user.ensureIndex({'name': 1, 'age': -1})
    > 数字 1 表示 username 键的索引按升序存储，-1 表示 age 键的索引按照降序方式存储。

  - 唯一索引
    - db.user.ensureIndex({"userid":1},{"unique":true})
    > 如果再次插入 userid 重复的文档时，MongoDB 将报错

## 使用 explain
  - db.tablename.find().explain( "executionStats" )
  > 查询具体的执行时间
  

## Mongodb 账户权限配置

### 创建一个超级管理员
  - 01创建超级管理用户
    > use admin db.createUser({ user:'admin', pwd:'123456', roles:[{role:'root',db:'admin'}] })
  
  - 02 第二步修改 Mongodb 数据库配置文件 --  mongod.cfg
    > security: authorization: enabled

  - 03 第三步重启 mongodb 服务

  -04 用超级管理员账户连接数据库
    > mongo admin -u 用户名 -p 密码
    > mongo 192.168.1.200:27017/test -u user -p password

### 给 cms 数据库创建一个用户
  use cms db.createUser( { user: "cmsadmin", pwd: "123456", roles: [ { role: "dbOwner", db: "cms" } ] } )

## Mongodb 账户权限配置中常用的命令
  - show users; 
    > #查看当前库下的用户

  - db.dropUser("eggadmin") 
    > #删除用户

  - db.updateUser( "admin",{pwd:"password"}); 
    > #修改用户密码
  
  - db.auth("admin","password"); 
    > #密码认证
  
## Mongodb 数据库角色
  - 1.数据库用户角色：read、readWrite; 
  - 2.数据库管理角色：dbAdmin、dbOwner、userAdmin； 
  - 3.集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager； 
  - 4.备份恢复角色：backup、restore； 
  - 5.所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、 dbAdminAnyDatabase 
  - 6.超级用户角色：root

## MongoDB 的高级查询 aggregate 聚合管道
  > 使用聚合管道可以对集合中的文档进行变换和组合。
  > 实际项目：表关联查询、数据的统计。
  > MongoDB中使用db.COLLECTION_NAME.aggregate([{<stage>},...])方法来构建和使用聚合管道

  ## 管道操作符 Description
  - $project 增加、删除、重命名字段
    > db.order.aggregate([ { $project:{ trade_no:1, all_price:1 } } ])

  - $match 条件匹配。只满足条件的文档才能进入下 一阶段
    > db.order.aggregate([ { $project:{ trade_no:1, all_price:1 } }, { $match:{"all_price":{$gte:90}} } ])

  - $limit 限制结果的数量
    > db.order.aggregate([ { $project:{ trade_no:1, all_price:1 } }, { $match:{"all_price":{$gte:90}} }, { $sort:{"all_price":-1} }, { $limit:1 } ])
    
  - $skip 跳过文档的数量
    > db.order.aggregate([ { $project:{ trade_no:1, all_price:1 } }, { $match:{"all_price":{$gte:90}} }, { $sort:{"all_price":-1} }

  - $sort 条件排序
    > db.order.aggregate([ { $project:{ trade_no:1, all_price:1 } }, { $match:{"all_price":{$gte:90}} }, { $sort:{"all_price":-1} } ])

  - $group 条件组合结果 统计
    > db.order_item.aggregate( [ { $group: {_id: "$order_id", total: {$sum: "$num"}} } ])

  - $lookup 用以引入其它集合的数据（表关联查询）
    > db.order.aggregate([ { $lookup: { from: "order_item", localField: "order_id", foreignField: "order_id", as: "items" } } ])


## mongose
  


