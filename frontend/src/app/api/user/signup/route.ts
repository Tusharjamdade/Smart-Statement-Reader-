import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../db';

export async function POST(request:NextRequest) {
  try {
    // Parse the request body
    const { email, password, role } = await request.json();

    // Validate the input
    if (!email || !password || !role) {
      return NextResponse.json(
        { msg: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { msg: "User with this email already exists" },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });

    return NextResponse.json(
      { msg: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function GET(){
    return Response.json({msg:"test"})
}