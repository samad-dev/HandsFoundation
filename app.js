const express = require('express')
, routes = require('./routes')
, user = require('./routes/user');

const app = express();
const session = require('express-session');
const http = require('https').Server(app);

let bodyParser = require("body-parser");
const { dirname } = require('path');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))


app.param('id', function(req, res, next, name) {
    req.id = name;
    next();
  });


  
  

  app.get('/', routes.index);//call for main index page
  // app.get('/signup', user.signup);//call for signup page
  // app.post('/signup', user.signup);//call for signup post 
  // app.get('/login', routes.index);//call for login page
  // app.post('/login', user.login);//call for login post
  // app.get('/home/logout', user.logout);//call for logout
 app.get('/login', routes.index);//call for login page
  app.post('/login', user.login2);
// app.get('/login', user.login);//call for login post
// app.get('/all', user.all_vehicle);//call for login post
// app.get('/card', user.all_cards);//call for login post
// app.get('/not_alloc', user.not_alloc);//call for login post
// app.get('/user_list', user.user_list);//call for login post
// app.get('/rpt_emp_vehicle', user.rpt_emp_vehicle);//call for login post
// app.get('/rpt_mntn_summery', user.rpt_mntn_summery);//call for login post
// app.get('/rpt_gps_monthly', user.rpt_gps_monthly);//call for login post
// app.get('/rpt_emp_wo_vehicle', user.rpt_emp_wo_vehicle);//call for login post
// app.get('/rpt_gps_hourly', user.rpt_gps_hourly);//call for login post
// app.get('/rpt_fuels', user.rpt_fuels);//call for login post
// app.get('/rpt_excep_monthly_entries', user.rpt_excep_monthly_entries);//call for login post
// app.get('/excel_import', user.excel_import);//call for login post
app.get('/dash', user.dash);//
// app.get('/map', user.map);//
// app.get('/geo', user.geo);//
// app.get('/manage_roles', user.manage_roles);//
app.get('/sidebar', user.sidebar);//call for login post
// app.get('/forms', user.forms);//call for login post
// app.get('/updateVehicle/:id', user.updateVehicle);//call for login post
app.get('/clientlist', user.clientlist);//call for login post
app.get('/district', user.district);//call for login post
app.post('/district', user.district2);//call for login post

app.get('/lhv_add', user.lhv_add);
app.get('/marvi_add', user.marvi_add);
app.get('/add_client', user.add_client);
app.get('/update_lhv_add/:id', user.update_lhv_add);
app.post('/adduser',user.adduser);
app.post('/marvi_add_user',user.marvi_add_user);
app.post('/addnew_client',user.addnew_client);
app.post('/updateuser/:id',user.updateuser);
app.get('/delete/:id',user.delete);
app.get('/delete_marvi/:id',user.delete_marvi);
app.get('/marvi_update/:id', user.marvi_update);
app.post('/updatemarvi/:id',user.updatemarvi);
app.get('/add_client_table', user.add_client_table);
app.get('/delete_add_client/:id',user.delete_add_client);
app.get('/update_add_client/:id',user.update_add_client);
app.post('/update_add_client_table/:id',user.update_add_client_table);
app.get('/product', user.product);
app.post('/product_add',user.product_add);
app.get('/delete_product/:id',user.delete_product);
app.get('/edit_product/:id',user.edit_product);
app.post('/update_product/:id',user.update_product);
app.get('/transfer',user.transfer);




app.listen(3000, function() {
    console.log('listening on 3000')
})



