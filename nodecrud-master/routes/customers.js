/*
 * GET users listing.
 */

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM customer', function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {

                res.json(rows);
            }
            //res.render('customers',{page_title:"Customers - Node.js",data:rows});


        });

        //console.log(query.sql);
    });

};


exports.add = function (req, res) {
    res.render('add_customer', {page_title: "Add Customers - Node.js"});
};

exports.edit = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM customer WHERE id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('edit_customer', {page_title: "Edit Customers - Node.js", data: rows});
            //res.redirect('http://localhost:4300/datatable.html');

        });

        //console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        var query = connection.query("INSERT INTO customer set ? ", data, function (err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);

            res.render('edit_customer', {page_title: "Edit Customers - Node.js", data: rows});
            //res.redirect('http://localhost:4300/datatable.html');

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        connection.query("UPDATE customer set ? WHERE id = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);

            res.redirect('/customers');
            //res.redirect('http://localhost:4300/datatable.html');
        });

    });
};



exports.delete_customer = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    /*console.log(id);*/
    var data = {
        id: input.id,
        name: input.name,
        address: input.address,
        email: input.email,
        phone: input.phone

    };
    //console.log("id");
    req.getConnection(function (err, connection) {

        connection.query('DELETE FROM customer WHERE id = ?', [id], function (err, result) {
            if (err) throw err;

            console.log('deleted ' + result.affectedRows + ' rows');
            res.redirect('http://localhost:4300/datatable.html');
        })
    });

};

exports.del = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.body.id;

    req.getConnection(function (err, connection) {

        var data = {
            id: input.id,
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        connection.query('DELETE FROM customer WHERE id = "95"', function (err, result) {
            if (err) throw err;

            console.log('deleted ' + result.affectedRows + ' rows');
            res.redirect('http://localhost:4300/datatable.html');
        })

    });
};

