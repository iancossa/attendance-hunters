const express = require('express');

const app = express();

app.listen(PORT, () => {
        console.log('\n🚀 Attendance RPA Server Started');
        console.log('================================');
        console.log(`📍 Server: http://localhost:${PORT}`);
        console.log(`📊 Health: http://localhost:${PORT}/health`);
        console.log(`📚 API Docs: http://localhost:${PORT}/api`);
        console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
        console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
        console.log('================================\n');
    });

