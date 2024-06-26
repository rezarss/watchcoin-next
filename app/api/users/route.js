import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';

// export const runtime = 'edge';

export async function GET(request) {
    try {
        // const db = await dbConnect();

        // const newUser = new User({ name: "ali amiri", coin: 0, wallet: null, refs: [], role: "player" });
        // await newUser.save();

        // const users = await User.find({ _id: "66701d199455fef456fd65e6" });

        return NextResponse.json({ users: 1 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
