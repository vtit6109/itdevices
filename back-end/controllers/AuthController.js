const jwt = require('jsonwebtoken');
const Account = require('../models/AuthModel');

require('dotenv').config();

exports.login = async (req, res) => {
  const { accountName, accountPass } = req.body;

  try {
    const user = await Account.findByCredentials(accountName, accountPass);

    if (!user) {
      return res.status(401).json({ message: 'Tên tài khoản hoặc mật khẩu không đúng' });
    }

    const payload = {
      user: {
        accountID: user.accountID,
        accountRole: user.accountRole
      }
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

exports.register = async (req, res) => {
  const { accountName, accountPass, accountRole } = req.body;
  try {
    const newAccount = await Account.createAccount(accountName, accountPass, accountRole);
    res.status(201).json({ message: 'Tạo tài khoản thành công', account: newAccount });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo tài khoản', error });
  }
};


exports.changePassword = async (req, res) => {
  const { accountID, newPassword } = req.body;
  const success = await Account.changePassword(accountID, newPassword);
  if (success) {
      res.status(200).json({ message: 'Password changed successfully' });
  } else {
      res.status(500).json({ message: 'Failed to change password' });
  }
};

exports.getAccount = async (req, res) => {
  const { accountID } = req.user;
  const account = await Account.getAccountById(accountID);
  if (account) {
      res.status(200).json(account);
  } else {
      res.status(404).json({ message: 'Account not found' });
  }
};