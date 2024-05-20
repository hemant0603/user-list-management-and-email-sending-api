const List = require("../Models/List");

 const createList = async (req, res) => {
    try {
        const { title, properties } = req.body;
        const list = new List({ title, properties });
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error creating list', error });
    }
};

module.exports = createList;
