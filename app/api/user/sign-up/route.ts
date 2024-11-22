import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '@/models/user'
import connectToDatabase from '@/lib/mongodb'


export async function POST(request: Request){
    const body = await request.json();
    console.log("Received Body:", body);

        const { name, email, password, confirmPassword, phoneNumber, country } = body;

    console.log("Parsed Fields:", { name, email, password, confirmPassword, phoneNumber });

    const isValidEmail = (email:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if(!name || !email ||  !password || !confirmPassword || !phoneNumber || !country ){
        return NextResponse.json({message: "All  fields are required"}, {status: 400})
    }
    console.log("All fields validated successfully");

    if(!isValidEmail){
        return NextResponse.json({message: "Invalid email format"}, {status: 400})
    }

    if(confirmPassword !== password){
        return NextResponse.json({message: "Passwords do not match"}, {status: 400})
    }
    if(password.length<6){
        return NextResponse.json({message: "Password must be above 6 characters"}, {status: 400})
    }

    try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return NextResponse.json({message: "User already exists"}, { status: 400});

        }

        const hashedPassword= await bcrypt.hash(password, 10)

        if (!phoneNumber) {
            return NextResponse.json({ message: "Phone number is required TobeyTee" }, { status: 400 });
        }
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            phoneNumber,
            country,
        })

        await newUser.save();

        

        return NextResponse.json({ message: "User Created Successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: error}, {status: 500})
    }
}



