# 安装
# 启动
  - mongod --dbpath (url)
  - mongo 启动本地数据库

# 远程连接数据库  
  - mongo：127.0.0.1:27017

# 查看有哪些数据库
  - show dbs

# 进入 或者创建 admin 数据库
  - use admin 

# 创建一个 user 得表 并且插入一条数据 或者 插入一条数据
 - db.user.insert({"name": "qiao"})

# 查看 数据库中 有哪些 表 
  - show collections

# 查看 admin 表中 的 数据
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
  
  
# 删除 集合admin
  - db.admin.drop()

# 删除当前数据库
  - db.dropDatabase()

# 修改数据
  - db.admin.update({"name": "xiaoqiao"},{$set: {"name": "XIAO"}})

# 删除数据
db.admin.remove({"name": "xiaoqiao"})

  db.user.ensureIndex({"username":1})

  db.user.getIndexes()

  db.user.dropIndex({"username":1})

  db.user.ensureIndex({"username":1, "age":-1}) ---->数字 1 表示 username 键的索引按升序存储，-1 表示 age 键的索引按照降序方式存储

  db.user.ensureIndex({"userid":1},{"unique":true })