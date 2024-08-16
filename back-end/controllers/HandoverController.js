const HistoryHandoverUser = require('../models/HandoverModel');

exports.getAllHistoryHandoverUsers = async (req, res) => {
    try {
        const historyHandoverUsers = await HistoryHandoverUser.getAllHistoryHandoverUsers();
        res.status(200).json(historyHandoverUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch sử bàn giao người dùng' });
    }
};

exports.getHistoryHandoverUserById = async (req, res) => {
    const handoverId = req.params.id;
    try {
        const historyHandoverUser = await HistoryHandoverUser.getHistoryHandoverUserById(handoverId);
        if (historyHandoverUser) {
            res.status(200).json(historyHandoverUser);
        } else {
            res.status(404).json({ message: 'Không tìm thấy lịch sử bàn giao người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin lịch sử bàn giao người dùng' });
    }
};

exports.createHistoryHandoverUser = async (req, res) => {
    const { handoverDate, handoverTitle, handoverDes, userID } = req.body;
    try {
        const newHistoryHandoverUser = await HistoryHandoverUser.createHistoryHandoverUser(handoverDate, handoverTitle, handoverDes, userID);
        res.status(201).json(newHistoryHandoverUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo lịch sử bàn giao người dùng mới' });
    }
};

exports.updateHistoryHandoverUser = async (req, res) => {
    const id = req.params.id;
    const { handoverDate, handoverTitle, handoverDes, userID } = req.body;
    try {
        const updatedHistoryHandoverUser = await HistoryHandoverUser.updateHistoryHandoverUser(id, handoverDate, handoverTitle, handoverDes, userID);
        if (updatedHistoryHandoverUser) {
            res.status(200).json(updatedHistoryHandoverUser);
        } else {
            res.status(404).json({ message: 'Không tìm thấy lịch sử bàn giao người dùng để cập nhật' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật lịch sử bàn giao người dùng' });
    }
};

exports.deleteHistoryHandoverUser = async (req, res) => {
    const handoverId = req.params.id;
    try {
        const deletedHistoryHandoverUser = await HistoryHandoverUser.deleteHistoryHandoverUser(handoverId);
        if (deletedHistoryHandoverUser) {
            res.status(200).json({ message: 'Xóa lịch sử bàn giao người dùng thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy lịch sử bàn giao người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa lịch sử bàn giao người dùng' });
    }
};
