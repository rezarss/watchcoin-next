import mongoose from 'mongoose';

const connection = {};

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log('already connected.');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        connection.isConnected = db.connections[0].readyState;
        console.log({ connectionStatus: connection.isConnected });

        return db;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw new Error('Database connection failed');
    }
};

export default dbConnect;
