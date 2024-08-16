const Brand = require('../models/BrandModel')

exports.getAllBrand = async (req, res) => {
    try {
        const brands = await Brand.getAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while getting brands' });
    }
 };

 exports.getBrandById = async (req, res) => {
    const brandID = req.params.id;
    try {
        const brand = await Brand.getBrandById(brandID);
        if (!brand) return res.status(404).json({ message: 'Brand not found' });
        res.status(200).json(brand);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while getting brands' });
    }
}

exports.createBrand = async (req, res) => {
    const { brandName, brandDes } = req.body;
    try {
        const newBrand = await Brand.createBrand(brandName, brandDes);
        res.status(201).json(newBrand);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating brand' });
    }
}

exports.updateBrand = async (req, res) => {
    const brandID = req.params.id;
    const { brandName, brandDes } = req.body;
    try {
        const updatedBrand = await Brand.updateBrand(brandID, brandName, brandDes);
        if (updatedBrand) {
            res.status(200).json(updatedBrand);
        } else {
            res.status(404).json({ message: 'Brand not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating brand' });
    }
}

exports.deleteBrand = async (req, res) => {
    const brandID = req.params.id;
    try {
        const deletedBrand = await Brand.deleteBrand(brandID);
        if (!deletedBrand) return res.status(404).json({ message: 'Brand not found' });
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while deleting brand' });
    }
}