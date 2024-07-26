const User = require('../models/UserModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
    }
};

exports.createUser = async (req, res) => {
    const { userName, userEmail, deptID } = req.body;
    try {
        const newUser = await User.createUser(userName, userEmail, deptID);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo người dùng mới' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { userName, userEmail, deptID } = req.body;
    try {
        const updatedUser = await User.updateUser(userId, userName, userEmail, deptID);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.deleteUser(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'Xóa người dùng thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa người dùng' });
    }
};
