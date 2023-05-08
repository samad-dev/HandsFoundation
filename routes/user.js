// const config = {
//     server: "DESKTOP-3G04C20",
//     database: 'demo',
//     port: 1433,
//     dialect: "node-mssql",
//     options: {
//         trustedConnection: true,
//         enableArithAbort:true
//     }
// };
var mysql = require('mysql');
const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'demo'
};
var con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hands",
    connectTimeout: 60000

});
exports.login = function (req, res) {
    var json = JSON.parse('{"status":"OK"}')
    res.render('index', { somi: json });
};

exports.login2 = function (request, response) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "hands"

    });
    var username = request.body.user_name;
    var password = request.body.password;
    con.connect(function (err) {
        if (err) console.log(err)
        // console.log("SELECT * FROM User WHERE email='" + username + "' and password= '" + password + "'");
        con.query('SELECT * FROM User WHERE email= ?  and password =  ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                // request.session.loggedin = true;
                // request.session.username = username;
                // Redirect to home page
                response.redirect('/add_client');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    });
};


exports.dash = function (req, res) {
    var sql = require("mssql");

    const config = {
        authentication: { type: 'default', options: { userName: 'sa', password: 'Hands@123' } },
        server: "localhost",
        database: 'demo',
        port: 2259,
        dialect: "node-mssql",
        options: {
            encrypt: false,
            enableArithAbort: true
            // Use this if you're on Windows Azure
        }
    };
    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();

        request.query('SELECT count(*) as count FROM dbo.marvi_back_new', function (err, recordset) {
            if (err) console.log(err)


            request.query("SELECT count(*) as count FROM dbo.lhv_back where status='Active'", function (err, recordset2) {
                if (err) console.log(err)

                request.query("SELECT count(m_crcode) as count from dbo.mawra_client_master", function (err, recordset3) {
                    if (err) console.log(err)
                    request.query("SELECT count(*) as count FROM dbo.district_master", function (err, recordset4) {
                        if (err) console.log(err)
                        request.query("SELECT top 1000  m_crcode,id,m_worname As 'MWoName' ,m_lhvname As 'LHV',m_vill_name As 'Village',m_district_name As 'District',m_cnic As 'CNIC',m_age As 'Age',m_clientname As 'Client_Name',m_services As 'Services',m_contraceptivemethod As 'Method',m_quantity As 'Quantity',m_servicedate  As 'Last Service Date',m_nextdate As 'Next Service Date' FROM dbo.mawra_client_master order by id desc", function (err, recordset5) {
                            if (err) console.log(err)

                            request.query("SELECT COUNT(*) as count1, m_district_name FROM[demo].[dbo].[mawra_client_master] where m_district_name != '' GROUP BY m_district_name", function (err, recordset6) {
                                if (err) console.log(err)
                                request.query("SELECT COUNT(*) as count1, m_district_name FROM[demo].[dbo].[mawra_client_master] where m_district_name != '' and m_regdate >= dateadd(day, -30, getdate()) GROUP BY m_district_name", function (err, recordset7) {
                                    if (err) console.log(err)
                                    request.query("SELECT COUNT(distinct(m_mcucode)) as count,[m_lhvname] FROM[demo].[dbo].[mawra_client_master] where m_regdate >= dateadd(day, -30, getdate())  GROUP BY m_lhvname Order by count desc", function (err, recordset8) {
                                        if (err) console.log(err)
                                        request.query("SELECT distinct(m_contraceptivemethod),Count(m_crcode) as 'Count1' FROM[demo].[dbo].[mawra_client_master] where m_contraceptivemethod IS NOt null group by m_contraceptivemethod", function (err, recordset9) {
                                            if (err) console.log(err)
                                            request.query("SELECT distinct(m_contraceptivemethod),Count(m_crcode) as 'Count1' FROM[demo].[dbo].[mawra_client_master] Where m_regdate >= dateadd(day, -30, getdate()) group by m_contraceptivemethod", function (err, recordset10) {
                                                if (err) console.log(err)
                                                request.query("SELECT distinct(COUNT(m_crcode)) as count,[m_lhvname] FROM[demo].[dbo].[mawra_client_master] where m_regdate >= dateadd(day, -30, getdate())  GROUP BY m_lhvname Order by m_lhvname desc", function (err, recordset11) {
                                                    if (err) console.log(err)
                                                    console.log(recordset8["recordsets"][0]);
                                                    request.query("SELECT COUNT(*) as count1 FROM[demo].[dbo].[mawra_client_master] where m_regdate >= dateadd(day, -30, getdate())", function (err, recordset12) {
                                                        if (err) console.log(err)
                                                        console.log(recordset8["recordsets"][0]);
                                                        res.render('dash', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0], data4: recordset4["recordsets"][0], data5: recordset5["recordsets"][0], data6: recordset6["recordsets"][0], data7: recordset7["recordsets"][0], data8: recordset8["recordsets"][0], data9: recordset9["recordsets"][0], data10: recordset10["recordsets"][0], data11: recordset11["recordsets"][0], data12: recordset12["recordsets"][0] });
                                                    });
                                                    //res.render('dash', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0], data4: recordset4["recordsets"][0],data5: recordset5["recordsets"][0],data6: recordset6["recordsets"][0],data7: recordset7["recordsets"][0],data8: recordset8["recordsets"][0],data9: recordset9["recordsets"][0],data10: recordset10["recordsets"][0],data11: recordset11["recordsets"][0]});
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });

                    });

                });
            });
        });
    });

};
exports.dash2 = function (req, res) {
    res.render('dash')


};
exports.sidebar = function (req, res) {

    res.render('sidebar');
};
exports.updateVehicle = function (req, res) {
    console.log(req.id);
    var sql = require("mssql");

    var config = {
        user: "sa",
        password: "Hands@123",
        server: "localhost",
        database: 'demo',
        port: 1433,
        "options": {
            "encrypt": true,
            "enableArithAbort": true
        }
    };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('SELECT TOP (12) [vehicle_id],[as_on],round([km_per_ltr_gps],2) as gps FROM [asif].[dbo].[view_fuel_km_per_ltr_gps] where vehicle_id =' + req.id + '  order by as_on desc', function (err, recordset) {
            if (err) console.log(err)
            request.query('SELECT TOP (12) [as_on],round([rs_per_km_gps],2) as rs_per_km FROM [asif].[dbo].[view_fuel_km_per_ltr_gps] where vehicle_id = ' + req.id + ' order by as_on desc', function (err, recordset2) {
                if (err) console.log(err)
                // send records as a response
                request.query('SELECT TOP (12) round([sum_cng_cash]+[sum_cng_cc],2) as cng,round([total_fuel],2) as total,[as_on] FROM [asif].[dbo].[view_fuel_vehicle_monthly] where vehicle_id = ' + req.id + ' order by as_on desc', function (err, recordset3) {
                    if (err) console.log(err)
                    // send records as a response
                    request.query('SELECT TOP (12) [as_on],[GPSDistance],[ReportedDistance] FROM [asif].[dbo].[view_fuel_km_per_ltr_gps] where vehicle_id = ' + req.id + ' order by as_on desc', function (err, recordset4) {
                        if (err) console.log(err)
                        // send records as a response
                        request.query('SELECT * FROM [asif].[dbo].[vehicle_all] where id=' + req.id + '', function (err, recordset5) {
                            if (err) console.log(err)
                            // send records as a response
                            var vehicle_id = recordset5["recordsets"][0][0]['reg_number'];
                            request.query("SELECT * FROM [asif].[dbo].[view_allocation_history] where reg_number = '" + vehicle_id + "'", function (err, recordset6) {
                                if (err) console.log(err)
                                // send records as a response
                                request.query("select distinct(make) from vehicle_all", function (err, recordset7) {
                                    if (err) console.log(err)
                                    // send records as a response
                                    request.query("select distinct(state_name) from vehicle_all where state_name != 'n/a' order by state_name desc", function (err, recordset8) {
                                        if (err) console.log(err)
                                        // send records as a response
                                        request.query("select distinct(type_name) from vehicle_all where type_name != 'n/a' order by type_name desc", function (err, recordset9) {
                                            if (err) console.log(err)
                                            request.query("SELECT as_on,[GPSDistance] FROM [asif].[dbo].[view_fuel_km_per_ltr_gps] where vehicle_id = " + req.id + " order by as_on desc", function (err, recordset10) {
                                                if (err) console.log(err)
                                                // send records as a response
                                                request.query("SELECT [reg_number],[as_on],[Total_Fuel],[pt_cash_lt],[pt_cc_lt],[cng_cash_lt] ,[cng_cc_lt] FROM [view_fuel_km_per_ltr_gps] where vehicle_id = " + req.id + " order by as_on desc", function (err, recordset11) {
                                                    if (err) console.log(err)
                                                    // send records as a response
                                                    request.query("SELECT  [bill_date],[bill_amount] ,[details],[odometer],[created_on],[created_by],[bill_no],[repairhead],[vendor_name],[fname],[lname]FROM [asif].[dbo].[view_maintenance] where vehicle_id = " + req.id + " order by bill_date desc ", function (err, recordset12) {
                                                        if (err) console.log(err)
                                                        // send records as a response
                                                        console.log(recordset12["recordsets"][0]);
                                                        res.render('updateVehicle', { data1: recordset["recordsets"][0], data2: recordset2["recordsets"][0], data3: recordset3["recordsets"][0], data4: recordset4["recordsets"][0], data5: recordset5["recordsets"][0], data6: recordset6["recordsets"][0], make: recordset7["recordsets"][0], state: recordset8["recordsets"][0], type: recordset9["recordsets"][0], dist: recordset10["recordsets"][0], fuel: recordset11["recordsets"][0], maintenance: recordset12["recordsets"][0] });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
exports.clientlist = function (req, res) {
    var config = {
        authentication: { type: 'default', options: { userName: 'sa', password: 'Hands@123' } },
        server: "localhost",
        database: 'demo',
        port: 2259,
        dialect: "node-mssql",
        options: {
            encrypt: false,
            enableArithAbort: true
            // Use this if you're on Windows Azure
        }
    };
    var sql = require("mssql");
    sql.connect(config, function (err) {

        if (err) console.log(err);


        var request = new sql.Request();

        request.query("SELECT * FROM [demo].[dbo].[all_district] order by id desc", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            // console.log(recordset["recordsets"][0]);
            res.render('clientlist', { data1: recordset["recordsets"] });


        });
    });

};

exports.lhv_add = function (req, res) {


    con2.query("SELECT * FROM `lhv_table`", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        res.render('lhv_add', { listData: result });
    });

};

exports.marvi_add = function (req, res) {
    // var sql = require("mssql");
    con2.query("SELECT * FROM marvi_add_table", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        con2.query("SELECT * FROM `lhv_table`", function (err, result2, fields) {
            if (err) console.log(err)
            console.log(result);
            res.render('marvi_add', { listData: result, listData2: result2 });
        });
        // res.render('marvi_add', { listData: result  });
    });

};

exports.add_client = function (req, res) {
    var mysql = require('mysql');
    con2.query("SELECT * FROM lhv_table", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        con2.query("SELECT * FROM product_table", function (err, result2, fields) {
            if (err) console.log(err)
            console.log(result2);
            con2.query("SELECT * FROM marvi_add_table", function (err, result3, fields) {
                if (err) console.log(err)
                console.log(result3);
                res.render('add_client', { listData: result, listData2: result2, listData2: result3 });
            });
            // res.render('add_client', { listData: result ,listData2:result2 });
        });
        // res.render('add_client', { listData: result });
    });

};

exports.adduser = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var lhv_name = post.lhv_name;
        var husband_name = post.husband_name;
        var cnic_num = post.cnic_num;
        var contact_num = post.contact_num;
        var basicFlatpickr = post.basicFlatpickr;
        var edu = post.edu;
        var place_postdist = post.place_postdist;

        //Select all customers and return the result object:
        console.log("INSERT INTO `lhv_table`(lhv_name, husband_name,cnic_num, contact_num,basicFlatpickr, edu,place_postdist)  VALUES ('" + lhv_name + "','" + husband_name + "','" + cnic_num + "','" + contact_num + "','" + basicFlatpickr + "','" + edu + "','" + place_postdist + "')");
        con2.query("INSERT INTO `lhv_table`(lhv_name, husband_name,cnic_num, contact_num,basicFlatpickr, edu,place_postdist)  VALUES ('" + lhv_name + "','" + husband_name + "','" + cnic_num + "','" + contact_num + "','" + basicFlatpickr + "','" + edu + "','" + place_postdist + "')", function (err, result, fields) {
            if (err) console.log(err)
            console.log(result);
            message = "Data Save Succesfully!";
            console.log("Data Save Succesfully!");
            res.redirect('/lhv_add');
        });


    }
};

exports.marvi_add_user = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var marvi_name = post.marvi_name;
        var designation = post.designation;
        var religion = post.religion;
        var cnic_num = post.cnic_num;
        var date_of_join = post.basicFlatpickr;
        var date_of_end = post.basicFlatpickr1;
        var husband_name = post.husband_name;
        var status = post.status;
        var date_of_birth = post.basicFlatpickr2;
        var cnic_expiry = post.cnic_expiry;
        var qualification = post.qualification;
        var address = post.address;
        var village = post.village;
        var taluka = post.taluka;
        var uc_name = post.uc_name;
        var district = post.district;
        var dropout_month = post.dropout_month;
        var dropout_reason = post.dropout_reason;
        var marvi_code = post.marvi_code;

        con2.query("INSERT INTO marvi_add_table(marvi_name, designation,religion, cnic_num, date_of_join, date_of_end, husband_name, status, date_of_birth, cnic_expiry, qualification,address, village, taluka, uc_name, district, dropout_reason, dropout_month, marvi_code)  VALUES ('" + marvi_name + "','" + designation + "','" + religion + "','" + cnic_num + "','" + date_of_join + "','" + date_of_end + "','" + husband_name + "','" + status + "','" + date_of_birth + "','" + cnic_expiry + "','" + qualification + "','" + address + "','" + village + "','" + taluka + "','" + uc_name + "','" + district + "','" + dropout_month + "','" + dropout_reason + "','" + marvi_code + "')", function (err, result, fields) {
            if (err) console.log(err)
            console.log(result);
            message = "Data Save Succesfully!";
            console.log("Data Save Succesfully!");
            res.redirect('/marvi_add');
        });

    }
};

exports.addnew_client = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var mw_code = post.mw_code;
        var marvi_worker_name = post.marvi_worker_name;
        var lhv_code = post.lhv_code;
        var lhv_name = post.lhv_name;
        var village_name = post.village_name;
        var uc_name = post.uc_name;
        var tehsil_name = post.tehsil_name;
        var district_name = post.district_name;
        var reg_date = post.basicFlatpickr;
        var cnic_num = post.cnic_num;
        var contact_num = post.contact_num;
        var edu = post.edu;
        var occupation = post.occupation;
        var mwra_age = post.mwra_age;
        var marriage_duration = post.marriage_duration;
        var pregnant_check = post.pregnant_check;
        var no_of_children = post.no_of_children;
        var no_of_abortion = post.no_of_abortion;
        var no_of_dead_child = post.no_of_dead_child;
        var reason_death = post.reason_death;
        var child_age_5plus = post.child_age_5plus;
        var current_userFP = post.current_userFP;
        var ever_userFP = post.ever_userFP;
        var become_userFP = post.become_userFP;
        var reason_userFP = post.reason_userFP;
        var cr_code = post.cr_code;
        var client_name = post.client_name;
        var husband_name = post.husband_name;
        var gap_of_births = post.gap_of_births;
        var youngest_child_age = post.youngest_child_age;
        var user_status = post.user_status;
        var user_type = post.user_type;
        var user_by_wealth = post.user_by_wealth;
        var services = post.services;
        var user_by_occasion = post.user_by_occasion;
        var user_by_disability = post.user_by_disability;
        var client_service_date = post.basicFlatpickr1;
        var contra_method = post.contra_method;
        var next_service_date = post.basicFlatpickr2;
        var contra_quantity = post.contra_quantity;
        var contra_frequency = post.contra_frequency;
        var no_of_months = post.no_of_months;
        var age_of_children = post.age_of_children;
        var method_of_fp_current = post.method_of_fp_current;
        var method_of_fp_ever = post.method_of_fp_ever;
        console.log("pregnet " + pregnant_check)
        if (pregnant_check != null) {
            pregnant_check = 1;
        } else {
            pregnant_check = 0
        }

        if (child_age_5plus != null) {
            child_age_5plus = 1;
        } else {
            child_age_5plus = 0
        }

        if (current_userFP != null) {
            current_userFP = 1;
        } else {
            current_userFP = 0
        }

        if (ever_userFP != null) {
            ever_userFP = 1;
        } else {
            ever_userFP = 0
        }

        if (become_userFP != null) {
            become_userFP = 1;
        } else {
            become_userFP = 0
        }

        console.log("INSERT INTO add_client_table (mw_code, marvi_worker_name,lhv_code, lhv_name, village_name, uc_name, tehsil_name, district_name, reg_date, cnic_num, contact_num, edu, occupation, mwra_age, marriage_duration, pregnant_check, no_of_children, no_of_abortion, no_of_dead_child, reason_death, child_age_5plus, current_userFP, ever_userFP, become_userFP, reason_userFP, cr_code, client_name, husband_name,gap_of_births, youngest_child_age, user_status, user_type, user_by_wealth, services, user_by_occasion, user_by_disability, client_service_date, contra_method, next_service_date, contra_quantity, contra_frequency, no_of_months, age_of_children, method_of_fp_current, method_of_fp_ever)  VALUES ('" + mw_code + "','" + marvi_worker_name + "','" + lhv_code + "','" + lhv_name + "','" + village_name + "','" + uc_name + "','" + tehsil_name + "','" + district_name + "','" + reg_date + "','" + cnic_num + "','" + contact_num + "','" + edu + "','" + occupation + "','" + mwra_age + "','" + marriage_duration + "','" + pregnant_check + "','" + no_of_children + "','" + no_of_abortion + "','" + no_of_dead_child + "','" + reason_death + "','" + child_age_5plus + "','" + current_userFP + "','" + ever_userFP + "','" + become_userFP + "','" + reason_userFP + "','" + cr_code + "','" + client_name + "','" + husband_name + "','" + gap_of_births + "','" + youngest_child_age + "','" + user_status + "','" + user_type + "','" + user_by_wealth + "','" + services + "','" + user_by_occasion + "','" + user_by_disability + "','" + client_service_date + "','" + contra_method + "','" + next_service_date + "','" + contra_quantity + "','" + contra_frequency + "','" + no_of_months + "','" + age_of_children + "','" + method_of_fp_current + "','" + method_of_fp_ever + "')");
        con2.query("INSERT INTO add_client_table (mw_code, marvi_worker_name,lhv_code, lhv_name, village_name, uc_name, tehsil_name, district_name, reg_date, cnic_num, contact_num, edu, occupation, mwra_age, marriage_duration, pregnant_check, no_of_children, no_of_abortion, no_of_dead_child, reason_death, child_age_5plus, current_userFP, ever_userFP, become_userFP, reason_userFP, cr_code, client_name, husband_name,gap_of_births, youngest_child_age, user_status, user_type, user_by_wealth, services, user_by_occasion, user_by_disability, client_service_date, contra_method, next_service_date, contra_quantity, contra_frequency, no_of_months, age_of_children, method_of_fp_current, method_of_fp_ever)  VALUES ('" + mw_code + "','" + marvi_worker_name + "','" + lhv_code + "','" + lhv_name + "','" + village_name + "','" + uc_name + "','" + tehsil_name + "','" + district_name + "','" + reg_date + "','" + cnic_num + "','" + contact_num + "','" + edu + "','" + occupation + "','" + mwra_age + "','" + marriage_duration + "','" + pregnant_check + "','" + no_of_children + "','" + no_of_abortion + "','" + no_of_dead_child + "','" + reason_death + "','" + child_age_5plus + "','" + current_userFP + "','" + ever_userFP + "','" + become_userFP + "','" + reason_userFP + "','" + cr_code + "','" + client_name + "','" + husband_name + "','" + gap_of_births + "','" + youngest_child_age + "','" + user_status + "','" + user_type + "','" + user_by_wealth + "','" + services + "','" + user_by_occasion + "','" + user_by_disability + "','" + client_service_date + "','" + contra_method + "','" + next_service_date + "','" + contra_quantity + "','" + contra_frequency + "','" + no_of_months + "','" + age_of_children + "','" + method_of_fp_current + "','" + method_of_fp_ever + "')", function (err, result, fields) {
            if (err) console.log(err)
            console.log(result);
            message = "Data Save Succesfully!";
            console.log("Data Save Succesfully!");
            res.redirect('/add_client');
        });



    }
};

exports.update_lhv_add = function (req, res) {
    var id = req.id;
    con2.query("SELECT * FROM `lhv_table` where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        res.render('update_lhv_add', { listData: result });
    });

};

exports.marvi_update = function (req, res) {
    var id = req.id;
    con2.query("SELECT * FROM marvi_add_table where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        con2.query("SELECT * FROM `lhv_table`", function (err, result2, fields) {
            if (err) console.log(err)
            console.log(result2);
            res.render('marvi_update', { listData: result, listData2: result2 });
        });
        // res.render('lhv_add', { listData: result });
    });

};

exports.updatemarvi = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var marvi_name = post.marvi_name;
        var designation = post.designation;
        var religion = post.religion;
        var cnic_num = post.cnic_num;
        var date_of_join = post.basicFlatpickr;
        var date_of_end = post.basicFlatpickr1;
        var husband_name = post.husband_name;
        var status = post.status;
        var date_of_birth = post.basicFlatpickr2;
        var cnic_expiry = post.cnic_expiry;
        var qualification = post.qualification;
        var address = post.address;
        var village = post.village;
        var taluka = post.taluka;
        var uc_name = post.uc_name;
        var district = post.district;
        var dropout_month = post.dropout_month;
        var dropout_reason = post.dropout_reason;
        var marvi_code = post.marvi_code;
        var config = {
            user: 'sa',
            password: '123456',
            server: 'localhost',
            database: 'demo'
        };
        var id = req.id;
        con2.query("UPDATE `marvi_add_table` SET `marvi_name` = '" + marvi_name + "',`designation` = '" + designation + "',`religion` = '" + religion + "',`cnic_num` = '" + cnic_num + "',`date_of_join` = '" + date_of_join + "',`date_of_end` = '" + date_of_end + "',`husband_name` = '" + husband_name + "',`status` = '" + status + "',`date_of_birth` = '" + date_of_birth + "', `cnic_expiry` ='" + cnic_expiry + "',`qualification` = '" + qualification + "',`address` = '" + address + "',`village` = '" + village + "',`taluka` = '" + taluka + "',`uc_name` = '" + uc_name + "',`district` = '" + district + "',`dropout_month` = '" + dropout_month + "',`dropout_reason` = '" + dropout_reason + "',`marvi_code` = '" + marvi_code + "' where id = " + id + "", function (err, result2, fields) {
            if (err) console.log(err)
            console.log(result2);
            res.redirect('/marvi_add');
        });


    };
}

exports.updateuser = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var lhv_name = post.lhv_name;
        var husband_name = post.husband_name;
        var cnic_num = post.cnic_num;
        var contact_num = post.contact_num;
        var basicFlatpickr = post.basicFlatpickr;
        var edu = post.edu;
        var place_postdist = post.place_postdist;

        var id = req.id;
        console.log("UPDATE `lhv_table` SET `lhv_name` = '" + lhv_name + "',`husband_name` = '" + husband_name + "',`cnic_num` = '" + cnic_num + "',`contact_num` = '" + contact_num + "',`basicFlatpickr` = '" + basicFlatpickr + "',`edu` = '" + edu + "',`place_postdist` = '" + place_postdist + "' where id = " + id + "")
        con2.query("UPDATE `lhv_table` SET `lhv_name` = '" + lhv_name + "',`husband_name` = '" + husband_name + "',`cnic_num` = '" + cnic_num + "',`contact_num` = '" + contact_num + "',`basicFlatpickr` = '" + basicFlatpickr + "',`edu` = '" + edu + "',`place_postdist` = '" + place_postdist + "' where id = " + id + "", function (err, result, fields) {
            if (err) console.log(err)
            console.log(result);
            res.redirect('/lhv_add');
        });

    };
}

exports.delete = function (req, res, next) {
    var config = {
        authentication: { type: 'default', options: { userName: 'sa', password: 'Hands@123' } },
        server: "localhost",
        database: 'demo',
        port: 2259,
        dialect: "node-mssql",
        options: {
            encrypt: false,
            enableArithAbort: true
            // Use this if you're on Windows Azure
        }
    };
    var id = req.id;
    con2.query("DELETE FROM lhv_table where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
    });
    res.redirect("/lhv_add")
};

exports.delete_marvi = function (req, res, next) {
    var config = {
        authentication: { type: 'default', options: { userName: 'sa', password: 'Hands@123' } },
        server: "localhost",
        database: 'demo',
        port: 2259,
        dialect: "node-mssql",
        options: {
            encrypt: false,
            enableArithAbort: true
            // Use this if you're on Windows Azure
        }
    };
    var id = req.id;
    con2.query("DELETE FROM marvi_add_table where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        message = "Data Deleted Succesfully!";
        console.log("Data Deleted Succesfully!");
        res.redirect("/marvi_add")
    });

};

exports.delete_add_client = function (req, res, next) {
    var id = req.id;
    con2.query("DELETE FROM add_client_table where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        message = "Data Save Succesfully!";
        console.log("Data Save Succesfully!");
        res.redirect("/add_client_table")
    });
};

exports.district = function (req, res) {
    res.render('district');

};

exports.district2 = function (req, res) {
    var config = {
        authentication: { type: 'default', options: { userName: 'sa', password: 'Hands@123' } },
        server: "localhost",
        database: 'demo',
        port: 2259,
        dialect: "node-mssql",
        options: {
            encrypt: false,
            enableArithAbort: true
            // Use this if you're on Windows Azure
        }
    };
    var sql = require("mssql");
    sql.connect(config, function (err) {

        if (err) console.log(err);

        console.log(req.body.district);
        console.log(req.body.from);
        console.log(req.body.to);
        var request = new sql.Request();
        console.log("SELECT * FROM [demo].[dbo].[mawra_client_master] where m_district_name = '" + req.body.district + "' and m_regdate>='" + req.body.from + "' and m_regdate<='" + req.body.to + "'order by id desc");
        request.query("SELECT * FROM [demo].[dbo].[mawra_client_master] where m_district_name = '" + req.body.district + "' and m_regdate>='" + req.body.from + "' and m_regdate<='" + req.body.to + "'order by id desc", function (err, recordset) {
            if (err) console.log(err)

            // send records as a response
            console.log(recordset["recordsets"][0]);
            res.render('clientlist', { data1: recordset["recordsets"][0] });


        });
    });

};

exports.add_client_table = function (req, res) {

    con2.query("SELECT * FROM add_client_table", function (err, result, fields) {
        if (err) console.log(err)

        console.log(result);
        res.render('add_client_table', { listData: result });
    });

};

exports.update_add_client = function (req, res) {
    var id = req.id;
    con2.query("SELECT * FROM add_client_table  where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        con2.query("SELECT * FROM lhv_table", function (err, result2, fields) {
            if (err) console.log(err)
            console.log(result2);
            con2.query("SELECT * FROM product_table", function (err, result3, fields) {
                if (err) console.log(err)
                console.log(result3);
                res.render('update_add_client', { listData: result, listData2: result2, listData3: result3 });
            });
            // res.render('add_client', { listData: result });
        });
        // console.log(result);
        // res.render('update_add_client', { listData: result });
    });

}

exports.update_add_client_table = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var mw_code = post.mw_code;
        var marvi_worker_name = post.marvi_worker_name;
        var lhv_code = post.lhv_code;
        var lhv_name = post.lhv_name;
        var village_name = post.village_name;
        var uc_name = post.uc_name;
        var tehsil_name = post.tehsil_name;
        var district_name = post.district_name;
        var reg_date = post.basicFlatpickr;
        var cnic_num = post.cnic_num;
        var contact_num = post.contact_num;
        var edu = post.edu;
        var occupation = post.occupation;
        var mwra_age = post.mwra_age;
        var marriage_duration = post.marriage_duration;
        var pregnant_check = post.pregnant_check;
        var no_of_children = post.no_of_children;
        var no_of_abortion = post.no_of_abortion;
        var no_of_dead_child = post.no_of_dead_child;
        var reason_death = post.reason_death;
        var child_age_5plus = post.child_age_5plus;
        var current_userFP = post.current_userFP;
        var ever_userFP = post.ever_userFP;
        var become_userFP = post.become_userFP;
        var reason_userFP = post.reason_userFP;
        var cr_code = post.cr_code;
        var client_name = post.client_name;
        var husband_name = post.husband_name;
        var gap_of_births = post.gap_of_births;
        var youngest_child_age = post.youngest_child_age;
        var user_status = post.user_status;
        var user_type = post.user_type;
        var user_by_wealth = post.user_by_wealth;
        var services = post.services;
        var user_by_occasion = post.user_by_occasion;
        var user_by_disability = post.user_by_disability;
        var client_service_date = post.basicFlatpickr1;
        var contra_method = post.contra_method;
        var next_service_date = post.basicFlatpickr2;
        var contra_quantity = post.contra_quantity;
        var contra_frequency = post.contra_frequency;
        var no_of_months = post.no_of_months;
        var age_of_children = post.age_of_children;
        var method_of_fp_current = post.method_of_fp_current;
        var method_of_fp_ever = post.method_of_fp_ever;
        var id = req.id;
        con2.query("UPDATE `add_client_table` SET `mw_code` = '" + mw_code + "',`marvi_worker_name` = '" + marvi_worker_name + "',`lhv_code` = '" + lhv_code + "',`lhv_name` = '" + lhv_name + "',`village_name` = '" + village_name + "',`uc_name` = '" + uc_name + "',`tehsil_name` = '" + tehsil_name + "',`district_name` = '" + district_name + "',`reg_date` = '" + reg_date + "', `cnic_num` ='" + cnic_num + "',`contact_num` = '" + contact_num + "',`edu` = '" + edu + "',`occupation` = '" + occupation + "',`mwra_age` = '" + mwra_age + "',`marriage_duration` = '" + marriage_duration + "',`pregnant_check` = '" + pregnant_check + "',`no_of_children` = '" + no_of_children + "',`no_of_abortion` = '" + no_of_abortion + "',`no_of_dead_child` = '" + no_of_dead_child + "',`reason_death` = '" + reason_death + "',`child_age_5plus` = '" + child_age_5plus + "',`current_userFP` = '" + user_by_occasion + "',`ever_userFP` = '" + ever_userFP + "',`become_userFP` = '" + become_userFP + "',`reason_userFP` = '" + reason_userFP + "',`cr_code` = '" + cr_code + "',`client_name` = '" + client_name + "',`husband_name` = '" + husband_name + "',`gap_of_births` = '" + gap_of_births + "',`youngest_child_age` = '" + youngest_child_age + "',`user_status` = '" + user_status + "',`user_type` = '" + user_type + "',`user_by_wealth` = '" + user_by_wealth + "',`services` = '" + services + "',`user_by_occasion` = '" + user_by_occasion + "',`user_by_disability` = '" + user_by_disability + "',`client_service_date` = '" + client_service_date + "',`contra_method` = '" + contra_method + "',`next_service_date` = '" + next_service_date + "',`contra_quantity` = '" + contra_quantity + "',`contra_frequency` = '" + contra_frequency + "',`no_of_months` = '" + no_of_months + "',`age_of_children` = '" + age_of_children + "',`method_of_fp_current` = '" + method_of_fp_current + "',`method_of_fp_ever` = '" + method_of_fp_ever + "' where id = " + id + "", function (err, result, fields) {
            if (err) console.log(err)

            console.log(result);
            res.redirect('/add_client_table');
        });
    };
}

exports.product = function (req, res) {
    con2.query("SELECT * FROM product_table", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        res.render('product', { listData: result });
    });
};

exports.product_add = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var product_name = post.product_name;
        var product_descrip = post.product_descrip;
        console.log("INSERT `product_table` (`product_name`, `product_descrip`)  VALUES ('" + product_name + "','" + product_descrip + "')");
        con2.query("INSERT `product_table` (`product_name`, `product_descrip`)  VALUES ('" + product_name + "','" + product_descrip + "')", function (err, result, fields) {
            if (err) console.log(err)
            console.log(fields);
            res.redirect('/product');
        });

    }
};

exports.delete_product = function (req, res, next) {

    var id = req.id;
    con2.query("DELETE FROM  `product_table` where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(result);
        res.redirect('/product');
    });

};

exports.edit_product = function (req, res) {
    var id = req.id;
    con2.query("SELECT * FROM product_table where id = " + id + "", function (err, result, fields) {
        if (err) console.log(err)
        console.log(fields);
        res.render('edit_product', { listData: result });
    });
}

exports.update_product = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        var product_name = post.product_name;
        var product_descrip = post.product_descrip;

        var id = req.id;
        con2.query("UPDATE `product_table` SET `product_name` = '" + product_name + "',`product_descrip` = '" + product_descrip + "' where id = " + id + "", function (err, result, fields) {
            if (err) console.log(err)
            console.log(fields);
            res.redirect('/product');
        });
    };
}

exports.transfer = function (req, res) {

    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '123456',
        server: 'DESKTOP-3G04C20',
        database: 'demo'
    };
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select top 75000  * from [dbo].[add_client_table] where id >61110', async function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            // console.log(recordset.recordset.length);
            var promises = [];
            for (var i = 0; i < recordset.recordsets[0].length; i++) {
                // console.log(recordset.recordsets[0][i].id);
                var record = recordset.recordsets[0][i];
                var promise = new Promise(function (resolve, reject) {
                    con2.query("INSERT INTO `add_client_table`(`id`, `mw_code`, `marvi_worker_name`, `lhv_code`, `lhv_name`, `village_name`, `uc_name`, `tehsil_name`, `district_name`, `reg_date`, `cnic_num`, `contact_num`, `edu`, `occupation`, `mwra_age`, `marriage_duration`, `pregnant_check`, `no_of_months`, `no_of_children`, `no_of_abortion`, `no_of_dead_child`, `reason_death`, `child_age_5plus`, `age_of_children`, `current_userFP`, `method_of_fp_current`, `ever_userFP`, `method_of_fp_ever`, `become_userFP`, `reason_userFP`, `cr_code`, `client_name`, `husband_name`, `gap_of_births`, `youngest_child_age`, `user_status`, `user_type`, `user_by_wealth`, `services`, `user_by_occasion`, `user_by_disability`, `client_service_date`, `contra_method`, `next_service_date`, `contra_quantity`, `contra_frequency`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [record.id, record.mw_code, record.marvi_worker_name, record.lhv_code, record.lhv_name, record.village_name, record.uc_name, record.tehsil_name, record.district_name, record.reg_date, record.cnic_num, record.contact_num, record.edu, record.occupation, record.mwra_age, record.marriage_duration, record.pregnant_check, record.no_of_months, record.no_of_children, record.no_of_abortion, record.no_of_dead_child, record.reason_death, record.child_age_5plus, record.age_of_children, record.current_userFP, record.method_of_fp_current, record.ever_userFP, record.method_of_fp_ever, record.become_userFP, record.reason_userFP, record.cr_code, record.client_name, record.husband_name, record.gap_of_births, record.youngest_child_age, record.user_status, record.user_type, record.user_by_wealth, record.services, record.user_by_occasion, record.user_by_disability, record.client_service_date, record.contra_method, record.next_service_date, record.contra_quantity, record.contra_frequency],
                        function (err, result, fields) {
                            if (err) reject(err);
                            else {
                                console.log(result);
                                resolve(result);
                            }
                        });
                });
                promises.push(promise);
            }
            try {
                await Promise.all(promises);
                res.json(recordset.recordset);
            }
            catch (err) {
                console.log(err);
                res.status(500).send('Error transferring data');
            }

        });
    });
}
