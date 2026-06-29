"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehiculeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_vehicule_dto_1 = require("./create-vehicule.dto");
class UpdateVehiculeDto extends (0, mapped_types_1.PartialType)(create_vehicule_dto_1.CreateVehiculeDto) {
}
exports.UpdateVehiculeDto = UpdateVehiculeDto;
//# sourceMappingURL=update-vehicule.dto.js.map