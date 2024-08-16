const ModelDevice = require('../models/ModelDevicesModel');

exports.getAllModelDevices = async (req, res) => {
    try {
        const modelDevices = await ModelDevice.getAllModels();
        res.status(200).json(modelDevices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách ModelDevices' });
    }
};

exports.getModelDeviceById = async (req, res) => {
    const modelDeviceId = req.params.id;
    try {
        const modelDevice = await ModelDevice.getModelById(modelDeviceId);
        if (modelDevice) {
            res.status(200).json(modelDevice);
        } else {
            res.status(404).json({ message: 'Không tìm thấy ModelDevice' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin ModelDevice' });
    }
};

exports.createModelDevice = async (req, res) => {
    const { modelName, modelDes, categoryID } = req.body;
    try {
        const newModelDevice = await ModelDevice.createModel(modelName, modelDes, categoryID);
        res.status(201).json(newModelDevice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo ModelDevice mới' });
    }
};

exports.updateModelDevice = async (req, res) => {
    const modelID = req.params.id;
    const { modelName, modelDes, categoryID } = req.body;
    try {
        const updatedModelDevice = await ModelDevice.updateModel(modelID, modelName, modelDes, categoryID);
        if (updatedModelDevice) {
            res.status(200).json(updatedModelDevice);
        } else {
            res.status(404).json({ message: 'Không tìm thấy ModelDevice để cập nhật' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật ModelDevice' });
    }
};

exports.deleteModelDevice = async (req, res) => {
    const modelDeviceId = req.params.id;
    try {
        const deletedModelDevice = await ModelDevice.deleteModel(modelDeviceId);
        if (deletedModelDevice) {
            res.status(200).json({ message: 'Xóa ModelDevice thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy ModelDevice' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa ModelDevice' });
    }
};
