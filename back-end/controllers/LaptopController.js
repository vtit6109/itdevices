const LaptopInfo = require('../models/LaptopModel');

exports.getAllLaptopInfos = async (req, res) => {
    try {
        const laptopInfos = await LaptopInfo.getAllLaptop();
        res.status(200).json(laptopInfos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when getting the list of laptop information' });
    }
};

exports.getLaptopInfoById = async (req, res) => {
    const laptopID = req.params.id;
    try {
        const laptopInfo = await LaptopInfo.getLaptopByID(laptopID);
        if (laptopInfo) {
            res.status(200).json(laptopInfo);
        } else {
            res.status(404).json({ message: 'Laptop information not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when getting laptop information' });
    }
};

exports.createLaptopInfo = async (req, res) => {
    const { laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID } = req.body;
    try {
        const newLaptopInfo = await LaptopInfo.createLaptop(laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID);
        res.status(201).json(newLaptopInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when creating new laptop information' });
    }
};

exports.updateLaptopInfo = async (req, res) => {
    const id = req.params.id;
    const { laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID } = req.body;
    try {
        const updatedLaptopInfo = await LaptopInfo.updateLaptop(id, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID);
        if (updatedLaptopInfo) {
            res.status(200).json(updatedLaptopInfo); 
        } else {
            res.status(404).json({ message: 'Laptop information not found to update' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when updating laptop information' });
    }
};

exports.deleteLaptopInfo = async (req, res) => {
    const laptopID = req.params.id;
    try {
        const deletedLaptopInfo = await LaptopInfo.deleteLaptopInfo(laptopID);
        if (deletedLaptopInfo) {
            res.status(200).json({ message: 'Successfully deleted laptop information' });
        } else {
            res.status(404).json({ message: 'Laptop information not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when deleting laptop information' });
    }
};

module.exports = exports;
