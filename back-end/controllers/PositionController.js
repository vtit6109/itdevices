const Position = require('../models/PositionModel');

exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.getAllPosition();
        res.status(200).json(positions)
    }catch (error){
        console.log(error);
        res.status(500).json({message : 'error while getting positions'})
    }
}

exports.getPositionByID = async (req, res) =>{
    const positionID = req.params.getPositionByID
    try {
        const position = await Position.getPositionByID(positionID);

        if(position){
            res.status(200).json(position);
        }else{
            req.status(400).json({message : 'Không tìm thấy vị trí'});
        }
    }catch(error) {
        console.error(error);
        res.status(500).json({message : 'Không tìm thấy vị trí'});
    }
}

exports.createPosition = async (req, res) =>{
    const {postName , postDes} = req.body;
    try {
        const newPost = await Position.createPosition(postName, postDes)
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'lỗi khi tạo vị trí mới '})
    }
}

exports.updatePosition = async (req, res) =>{
    const postID = req.params.id;
    const {postName, postDes} = req.body;
    try {
        const updatePosition = await Position.updatePosition(postID,postName, postDes)
        if (updatePosition) {
            res.status(200).json(updatePosition);
        } else {
            res.status(404).json({message : 'không tìm thấy vị trí'})   
        }
        }catch (error) {
            console.log(error);
            res.status(500).json({message :'Lỗi khi cập nhận vị trí mới'})
        }
}
exports.deletePosition = async (req , res)  => {
    const postID = req.params.id;
    try {
        const deletePost = await Position.deletePosition(postID);
        if (deletePost){
            res.status(200).json({message :'Xóa vị trí thành công'});
        }else {
            res.status(404).json({message : 'không tìm thấy bộ phận nào'});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message : 'Lỗi khi xóa bộ phận'});
    }
}