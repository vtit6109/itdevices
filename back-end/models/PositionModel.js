const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Position {
    constructor(postID, postName, postDes) {
        this.postID = postID;
        this.postName = postName;
        this.postDes = postDes;
    }
    static async getAllPosition(){
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM Positions');
            const positions = result.recordset.map(row => new Position(row.PostID, row.PostName, row.PostDes));
            return positions;
        }catch (error)  {
            console.error(error);
            return [];
        }    
    }


    static async getPositionById(postID) {
        await poolConnect;
      try {
        const request = pool.request();
        const result = await request
        .input('postID', mssql.Int, postID)
        .query('SELECT * FROM Positions WHERE PostID = @postID');
        if (result.recordset.length > 0) {
            const position = result.recordset[0];
            return new Position(position.PostID, position.PostName, position.PostDes);
        }else{
            return null;
        }
      }catch (error) {
        console.error(error);
        return null;
      }
    }
 

    static async createPosition(postName, postDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('postName', mssql.NVarChar, postName)
            .input('postDes', mssql.NVarChar, postDes) 
           .query('INSERT INTO Positions (PostName, PostDes)  OUTPUT INSERTED.* VALUES (@postName, @postDes)');
            const position = result.recordset[0];
            return new Position(position.PostID, position.PostName, position.PostDes);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async updatePosition(postID, postName, postDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('postID', mssql.Int, postID)
            .input('postName', mssql.NVarChar, postName)
            .input('postDes', mssql.NVarChar, postDes) 
            .query('UPDATE Positions SET PostName=@postName, PostDes=@postDes OUTPUT INSERTED.* WHERE PostID=@postID');
            if(result.recordset.length>0){
                const post = result.recordset[0];
                return new Position(post.PostID, post.PostName, post.PostDes);
            }else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async deletePosition(postID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('postID', mssql.Int, postID)
            .query('DELETE FROM Positions OUTPUT DELETED.* WHERE PostID = @postID');
            if (result.recordset.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = Position;
