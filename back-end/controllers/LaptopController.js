const LaptopInfo = require('../models/LaptopModel');

exports.getAllLaptops = async (req, res) => {
    try {
        const laptops = await LaptopInfo.getAllLaptop();
        res.status(200).json(laptops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách laptops' });
    }
};

exports.getLaptopById = async (req, res) => {
    const laptopID = req.params.id;
    try {
        const laptop = await LaptopInfo.getLaptopByID(laptopID);
        if (laptop) {
            res.status(200).json(laptop);
        } else {
            res.status(404).json({ message: 'Không tìm thấy laptop' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin laptop' });
    }
};

exports.createLaptop = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    }
    const { laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID } = req.body;
    try {
        const newLaptop = await LaptopInfo.createLaptop(laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID);
        res.status(201).json(newLaptop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo laptop mới' });
    }
};

exports.updateLaptop = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    }
    const id = req.params.id;
    const { laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID } = req.body;
    try {
        const updatedLaptop = await LaptopInfo.updateLaptop(id, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID);
        if (updatedLaptop) {
            res.status(200).json(updatedLaptop);
        } else {
            res.status(404).json({ message: 'Không tìm thấy laptop để cập nhật' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật laptop' });
    }
};

exports.deleteLaptop = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    }
    const laptopID = req.params.id;
    try {
        const deletedLaptop = await LaptopInfo.deleteLaptop(laptopID);
        if (deletedLaptop) {
            res.status(200).json({ message: 'Xóa laptop thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy laptop để xóa' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa laptop' });
    }
};