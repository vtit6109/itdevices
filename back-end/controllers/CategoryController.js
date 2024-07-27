const Category = require('../models/CategoryModel');

exports.getAllCategory = async (req, res) =>{
    try {
        const categories = await Category.getAllCategory();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh mục' });
    }
}