const Dept = require('../models/DeptModel');

exports.getAllDepts = async (req, res) => {
    try {
        const depts = await Dept.getAllDepts();
        res.status(200).json(depts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bộ phận' });
    }
};

exports.getDeptById = async (req, res) => {
    const deptID = req.params.id;
    try {
        const dept = await Dept.getDeptByID(deptID);
       
        if (dept) {
            res.status(200).json(dept);
        } else {
            res.status(404).json({ message: 'Không tìm thấy bộ phận' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin bộ phận' });
    }
};

exports.createDept = async (req, res) => {
    const { deptName, deptDes } = req.body;
    try {
        const newDept = await Dept.createDept(deptName, deptDes);
        res.status(201).json(newDept);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo bộ phận mới' });
    }
};

exports.updateDept = async (req, res) => {
    const deptID = req.params.id;
    const { deptName, deptDes } = req.body;
    try {
        const updatedDept = await Dept.updateDept(deptID, deptName, deptDes);
        if (updatedDept) {
            res.status(200).json(updatedDept);
        } else {
            res.status(404).json({ message: 'Không tìm thấy bộ phận' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật bộ phận' });
    }
};

exports.deleteDept = async (req, res) => {
    const deptID = req.params.id;
    try {
        const deletedDept = await Dept.deleteDept(deptID);
        if (deletedDept) {
            res.status(200).json({ message: 'Xóa bộ phận thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy bộ phận' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa bộ phận' });
    }
};