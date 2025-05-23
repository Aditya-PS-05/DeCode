// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../lib/prisma';

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginPayloadType = await req.json();

    // Check if user exists
    let findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // Create user if not found
    if (!findUser) {
      findUser = await prisma.user.create({
        data: body,
      });
    }

    // Define JWT payload
    const JWTPayload = {
      name: findUser.name,
      email: findUser.email,
      id: findUser.id,
    };

    // Generate JWT token
    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: '365d',
    });

    // Send response with token
    return NextResponse.json({
      message: 'Logged in successfully!',
      user: {
        ...findUser,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again!' },
      { status: 500 }
    );
  }
}
