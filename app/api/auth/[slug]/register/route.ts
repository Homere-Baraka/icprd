import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { userRegisterSchema } from '@/lib/prisma-schema';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;

    const isPathValid = slug === process.env.ADMIN_REGISTER_PATH;

    if (!isPathValid) {
        return new NextResponse(null, { status: 404 });
    }

    try {
        const body = await req.json();
        const validated = userRegisterSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: validated.error.flatten().fieldErrors,
                },
                { status: 400 },
            );
        }

        const { username, email, password, is_active } = validated.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'This email is already in use' },
                { status: 409 },
            );
        }

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : null;

        const result = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                is_active: is_active ?? true,
                role: 'ADMIN',
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Admin account created successfully',
                admin: { id: result.id, email: result.email },
            },
            { status: 201 },
        );
    } catch (error: any) {
        console.error('[API_ADMIN_REGISTER_ERROR]', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
}
