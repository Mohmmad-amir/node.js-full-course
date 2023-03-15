const { v4: uuid } = require('uuid')
const Employee = require('../models/Employees')

// * index function
const index = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No Employees Found!' })
    res.json(employees)
}

//* show function
const show = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({
            "message": `No Employee Matches ID : ${req.body.id}`
        });
    };
    res.json(employee)
}

//* store function
const store = async (req, res) => {

    if (!req?.body?.firstName || !req?.body?.lastName) {
        return res.status(400).json({ 'message': 'firstname and lastname are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstName,
            lastname: req.body.lastName
        })
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }

}

// * update function
const update = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec()

    if (!employee) {
        return res.status(204).json({
            "message": `No Employee Matches ID : ${req.body.id}`
        });
    };
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

// * destroy function
const destroy = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({
            "message": `No Employee Matches ID : ${req.body.id}`
        });
    };
    const result = await employee.deleteOne({ _id: req.body.id })
    res.json(result);
}

module.exports = {
    index, show, store, update, destroy
};
