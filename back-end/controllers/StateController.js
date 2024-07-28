const StateUsing = require('../models/StateModel');

exports.getAllStateUsings = async (req, res) => {
    try {
        const stateUsings = await StateUsing.getAllStateUsings();
        res.status(200).json(stateUsings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while getting state usings' });
    }
};

exports.getStateUsingById = async (req, res) => {
    const stateUsingId = req.params.id;
    try {
        const stateUsing = await StateUsing.getStateUsingById(stateUsingId);
        if (stateUsing) {
            res.status(200).json(stateUsing);
        } else {
            res.status(404).json({ message: 'State using not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while getting state using' });
    }
};

exports.createStateUsing = async (req, res) => {
    const { stateName, stateDes } = req.body;
    try {
        const newStateUsing = await StateUsing.createStateUsing(stateName, stateDes);
        res.status(201).json(newStateUsing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating state using' });
    }
};

exports.updateStateUsing = async (req, res) => {
    const stateUsingId = req.params.id;
    console.log(stateUsingId);
    const { stateName, stateDes } = req.body;
    try {
        const updatedStateUsing = await StateUsing.updateStateUsing(stateUsingId, stateName, stateDes);
        if (updatedStateUsing) {
            res.status(200).json(updatedStateUsing);
        } else {
            res.status(404).json({ message: 'State using not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating state using' });
    }
};

exports.deleteStateUsing = async (req, res) => {
    const stateUsingId = req.params.id;
    try {
        const deletedStateUsing = await StateUsing.deleteStateUsing(stateUsingId);
        if (deletedStateUsing) {
            res.status(200).json({ message: 'State using deleted successfully' });
        } else {
            res.status(404).json({ message: 'State using not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while deleting state using' });
    }
};