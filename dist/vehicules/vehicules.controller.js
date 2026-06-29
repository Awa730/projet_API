"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vehicules_service_1 = require("./vehicules.service");
const create_vehicule_dto_1 = require("./dto/create-vehicule.dto");
const update_vehicule_dto_1 = require("./dto/update-vehicule.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let VehiculesController = class VehiculesController {
    vehiculesService;
    constructor(vehiculesService) {
        this.vehiculesService = vehiculesService;
    }
    findAll() {
        return this.vehiculesService.findAll();
    }
    findOne(id) {
        return this.vehiculesService.findOne(id);
    }
    create(dto) {
        return this.vehiculesService.create(dto);
    }
    update(id, dto) {
        return this.vehiculesService.update(id, dto);
    }
    remove(id) {
        return this.vehiculesService.remove(id);
    }
};
exports.VehiculesController = VehiculesController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister tous les vehicules (catalogue public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des vehicules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehiculesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Recuperer un vehicule par son id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vehicule trouve' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicule introuvable' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehiculesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Creer un vehicule (admin uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vehicule cree' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acces reserve aux administrateurs' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicule_dto_1.CreateVehiculeDto]),
    __metadata("design:returntype", void 0)
], VehiculesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre a jour un vehicule (admin uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vehicule mis a jour' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicule introuvable' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vehicule_dto_1.UpdateVehiculeDto]),
    __metadata("design:returntype", void 0)
], VehiculesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un vehicule (admin uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vehicule supprime' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicule introuvable' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VehiculesController.prototype, "remove", null);
exports.VehiculesController = VehiculesController = __decorate([
    (0, swagger_1.ApiTags)('vehicules'),
    (0, common_1.Controller)('vehicules'),
    __metadata("design:paramtypes", [vehicules_service_1.VehiculesService])
], VehiculesController);
//# sourceMappingURL=vehicules.controller.js.map