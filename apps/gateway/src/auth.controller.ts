import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() body: any) {
        // Dummy implementation
        return { message: 'Signup successful', data: body };
    }
} 