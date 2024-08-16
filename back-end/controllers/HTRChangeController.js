const HistoryChangesComponents = require('../models/HTRChangeModel');

exports.getAllChangesComponents = async (req, res) => {
    try {
        const changesComponents = await HistoryChangesComponents.getAllChangesComponents();
        res.status(200).json(changesComponents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách thay đổi thành phần' });
    }
};

exports.getChangesComponentsById = async (req, res) => {
    const changesComponentsID = req.params.id;
    try {
        const changesComponents = await HistoryChangesComponents.getChangesComponentsByID(changesComponentsID);
       
        if (changesComponents) {
            res.status(200).json(changesComponents);
        } else {
            res.status(404).json({ message: 'Không tìm thấy thay đổi thành phần' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin thay đổi thành phần' });
    }
};

exports.createChangesComponents = async (req, res) => {
    const { changesComponentsTitle, dateOfChangeComponents, changesComponentsDes } = req.body;
    try {
        const newChangesComponents = await HistoryChangesComponents.createChangesComponents(changesComponentsTitle, dateOfChangeComponents, changesComponentsDes);
        res.status(201).json(newChangesComponents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo thay đổi thành phần mới' });
    }
};

exports.updateChangesComponents = async (req, res) => {
    const changesComponentsID = req.params.id;
    const { changesComponentsTitle, dateOfChangeComponents, changesComponentsDes } = req.body;
    try {
        const updatedChangesComponents = await HistoryChangesComponents.updateChangesComponents(changesComponentsID, changesComponentsTitle, dateOfChangeComponents, changesComponentsDes);
        if (updatedChangesComponents) {
            res.status(200).json(updatedChangesComponents);
        } else {
            res.status(404).json({ message: 'Không tìm thấy thay đổi thành phần' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật thay đổi thành phần' });
    }
};

exports.deleteChangesComponents = async (req, res) => {
    const changesComponentsID = req.params.id;
    try {
        const deletedChangesComponents = await HistoryChangesComponents.deleteChangesComponents(changesComponentsID);
        if (deletedChangesComponents) {
            res.status(200).json({ message: 'Xóa thay đổi thành phần thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy thay đổi thành phần' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa thay đổi thành phần' });
    }
};
