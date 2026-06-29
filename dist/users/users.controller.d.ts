import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findMe(user: {
        id: number;
    }): Promise<import("./entities/user.entity").User>;
    updateMe(user: {
        id: number;
    }, dto: UpdateProfileDto): Promise<import("./entities/user.entity").User>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<void>;
}
