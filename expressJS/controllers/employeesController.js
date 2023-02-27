const { v4: uuid } = require('uuid')
const data = {
    employees: require('../models/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

// * index function
const index = (req, res) => {
    res.json(data.employees)
}

//* show function
const show = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID : ${req.body.id} not found`
        });
    };
    res.json(employee)
    // res.json({
    //     "id": req.params.id
    // });
}

//* store function
const store = (req, res) => {

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        // id: uuid,
        userName: req.body.userName,
        email: req.body.email,
        title: req.body.title,
    }
    if (!newEmployee.userName || !newEmployee.email) {
        return res.status(400).json({
            'message': "userName & Email are required..!"
        })
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(
        data.employees
        /*
        {
        "id": uuid,
        "userName": req.body.userName,
        "email": req.body.email,
        "title": req.body.title,
    }
    */
    );
}

// * update function
const update = (req, res) => {

    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID : ${req.body.id} not found`
        });
    };
    if (req.body.userName) employee.userName = req.body.userName;
    if (req.body.email) employee.email = req.body.email;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
    // res.json({
    //     "userName": req.body.userName,
    //     "email": req.body.email,
    //     "title": req.body.title,
    // });
}

// * destroy function
const destroy = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({
            "message": `Employee ID : ${req.body.id} not found`
        });
    };
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
    // res.json({ "id": req.body.id })
}

module.exports = {
    index, show, store, update, destroy
};
