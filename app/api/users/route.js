import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User'

export async function POST(request) {
    try {
        const db = await dbConnect();
        
        const newUser = new User({ name: "ali amiri", coin: 0, wallet: null, refs: [], role: "player" })
        await newUser.save()
        
        const users = await User.find({ _id: "66701d199455fef456fd65e6" });

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
