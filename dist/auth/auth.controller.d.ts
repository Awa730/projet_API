import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            nom: string;
            email: string;
            role: import("../common/enums/role.enum").Role;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            nom: string;
            email: string;
            role: import("../common/enums/role.enum").Role;
        };
    }>;
}
