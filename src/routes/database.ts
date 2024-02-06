import mysql from "mysql"


var connection = mysql.createConnection({
  host     : 'b74l2ilqg8dyheq5tdny-mysql.services.clever-cloud.com',
  user     : 'u7pwz0zs80fl7zyr',
  password : 'XIYUjmu9X3shOw1fpcBH',
  database : 'b74l2ilqg8dyheq5tdny'
});


connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });