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


exports.getCategoryById = async (req, res) => {
    const categoryID = req.params.id;
    try {
        const category = await Category.getCateByID(categoryID);
       
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin danh mục' });
    }
};

exports.createCategory = async (req, res) => {
    const { categoryName, categoryDes } = req.body;
    try {
        const newCategory = await Category.createCategory(categoryName, categoryDes);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo danh mục mới' });
    }
};

exports.updateCategory = async (req, res) => {
    const categoryID = req.params.id;
    const { categoryName, categoryDes } = req.body;
    try {
        const updatedCategory = await Category.updateCategory(categoryID, categoryName, categoryDes);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục' });
    }
};

exports.deleteCategory = async (req, res) => {
    const categoryID = req.params.id;
    try {
        const deletedCategory = await Category.deleteCategory(categoryID);
        if (deletedCategory) {
            res.status(200).json({ message: 'Xóa danh mục thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa danh mục' });
    }
};