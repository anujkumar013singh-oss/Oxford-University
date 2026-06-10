const Admin = require('../models/Admin');
const { generateTokens, verifyRefreshToken } = require('../utils/jwtUtils');

let refreshTokens = [];

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const tokens = generateTokens(admin._id);
    refreshTokens.push(tokens.refreshToken);

    res.json({
      success: true,
      data: {
        admin: { id: admin._id, email: admin.email, name: admin.name },
        ...tokens
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const tokens = generateTokens(decoded.id);

    refreshTokens = refreshTokens.filter(t => t !== refreshToken);
    refreshTokens.push(tokens.refreshToken);

    res.json({
      success: true,
      data: { ...tokens }
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== refreshToken);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { login, refresh, logout };
