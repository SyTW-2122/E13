const databaseHost = String("172.16.113.2").trim();
const databasePort = String("27017").trim();
const databaseUser = String("user").trim();
const databasePassword = String("user").trim();
const databaseName = String("test").trim();
const databaseConnectionOpts = String("--authenticationDatabase test").trim();

 const database = {
  // Examples of valid connection strings.
  //remoteUrl : 'mongodb://todo:bitnami@mongodb-primary:27017/todo',
  //remoteUrl : 'mongodb://0eb6bfe9-0ee0-4-231-b9ee:PpqNdxdyyys5nnQNA6SmPatk4NGkPlkLpUeqYz33ikQKTNDy4cma42500PCpt8S0GF9qm0hzv0R0FKglK3v03g==@0eb6bfe9-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
  remoteUrl : `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?${databaseConnectionOpts}`,
  localUrl: 'mongodb://localhost/meanstacktutorials'
};
exports.database = database
