const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class StateUsing {
  constructor(stateID, stateName, stateDes) {
    this.stateID = stateID;
    this.stateName = stateName;
    this.stateDes = stateDes;
  }

  static async getAllStateUsings() {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request.query('SELECT * FROM StateUsing');
      const stateUsings = result.recordset.map(row => new StateUsing(row.StateID, row.StateName, row.StateDes));
      return stateUsings;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getStateUsingById(stateUsingId) {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request
      .input('stateUsingId', mssql.Int, stateUsingId)
      .query('SELECT * FROM StateUsing WHERE StateID = @stateUsingId');
      if (result.recordset.length > 0) {
        const stateusing = result.recordset[0];
        return new StateUsing(stateusing.StateID, stateusing.StateName, stateusing.StateDes);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async createStateUsing(stateName, stateDes) {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request
      .input('stateName', mssql.NVarChar, stateName)
      .input('stateDes', mssql.NVarChar, stateDes) 
      .query('INSERT INTO StateUsing(StateName, StateDes) OUTPUT INSERTED.* VALUES (@stateName, @stateDes)');
      const newStateUsing = result.recordset[0];

      return new StateUsing(newStateUsing.StateID, newStateUsing.StateName, newStateUsing.StateDes);
    } catch (error) {
      console.error('Error creating State:', error.message);
      console.error(error.stack);
      return null;
    }
  }

  static async updateStateUsing(stateUsingId, stateName, stateDes) {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request
          .input('stateUsingId', mssql.Int, stateUsingId)
          .input('stateName', mssql.NVarChar, stateName)
          .input('stateDes', mssql.NVarChar, stateDes)
          .query('UPDATE StateUsing SET StateName = @stateName, StateDes = @stateDes OUTPUT INSERTED.* WHERE StateID = @stateUsingId');
          if (result.recordset.length > 0) {
            const newState = result.recordset[0];
            return new StateUsing(newState.StateID, newState.StateName, newState.StateDes);
        } else {
            return null;
        }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async deleteStateUsing(stateUsingId) {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request
          .input('stateUsingId', mssql.Int, stateUsingId)
          .query('DELETE FROM StateUsing OUTPUT DELETED.* WHERE StateID = @stateUsingId');
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

module.exports = StateUsing;