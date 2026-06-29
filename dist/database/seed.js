"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const vehicules_service_1 = require("../vehicules/vehicules.service");
const users_service_1 = require("../users/users.service");
const statut_vehicule_enum_1 = require("../common/enums/statut-vehicule.enum");
const role_enum_1 = require("../common/enums/role.enum");
const vehicules = [
    {
        nom: 'BMW X3', categorie: 'SUV', places: 5, carburant: 'Diesel', boite: 'Automatique',
        annee: 2022, moteur: '2.0L TwinPower', vitesseMax: '230 km/h', puissance: '190 ch',
        acceleration: '8,0 s', usageIdeal: 'Voyage, famille et rendez-vous pro',
        pointsForts: ['Confort premium', 'Tenue de route', 'Grand coffre'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 65000, prixAchat: 22000000,
        image: '/images/BMW X3.jpeg',
    },
    {
        nom: 'Haval H6', categorie: 'SUV', places: 5, carburant: 'Essence', boite: 'Automatique',
        annee: 2023, moteur: '1.5L Turbo', vitesseMax: '180 km/h', puissance: '150 ch',
        acceleration: '9,8 s', usageIdeal: 'Déplacements urbains et longs trajets',
        pointsForts: ['Très spacieux', 'Caméra 360', 'Bon rapport prix'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 40000, prixAchat: 15000000,
        image: '/images/Haval H6.jpeg',
    },
    {
        nom: 'Mercedes GLE Coupé', categorie: 'Luxe', places: 5, carburant: 'Diesel', boite: 'Automatique',
        annee: 2021, moteur: '3.0L 6 cylindres', vitesseMax: '250 km/h', puissance: '330 ch',
        acceleration: '5,7 s', usageIdeal: 'Événements, business et confort haut de gamme',
        pointsForts: ['Intérieur luxe', 'Puissance', 'Silhouette coupé'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 120000, prixAchat: 55000000,
        image: '/images/Mercedes GLE coupé.jpeg',
    },
    {
        nom: 'Hyundai Santa Fe', categorie: 'SUV', places: 7, carburant: 'Diesel', boite: 'Automatique',
        annee: 2020, moteur: '2.2L CRDi', vitesseMax: '205 km/h', puissance: '200 ch',
        acceleration: '9,2 s', usageIdeal: 'Familles nombreuses et voyages interurbains',
        pointsForts: ['7 places', 'Climatisation arrière', 'Très confortable'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 50000, prixAchat: 18000000,
        image: '/images/Hyundai Santa Fe.jpeg',
    },
    {
        nom: 'Hyundai Creta', categorie: 'Citadine', places: 5, carburant: 'Essence', boite: 'Manuelle',
        annee: 2022, moteur: '1.5L', vitesseMax: '170 km/h', puissance: '115 ch',
        acceleration: '11,8 s', usageIdeal: 'Ville, petits budgets et trajets quotidiens',
        pointsForts: ['Économique', 'Facile à conduire', 'Compacte'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 25000, prixAchat: 10000000,
        image: '/images/Hyundai Creta.jpeg',
    },
    {
        nom: 'Peugeot 3008', categorie: 'SUV', places: 5, carburant: 'Diesel', boite: 'Automatique',
        annee: 2021, moteur: '1.5L BlueHDi', vitesseMax: '192 km/h', puissance: '130 ch',
        acceleration: '10,8 s', usageIdeal: 'Conduite confortable avec faible consommation',
        pointsForts: ['Économe', 'Design moderne', 'Aide à la conduite'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 45000, prixAchat: 16000000,
        image: '/images/Peugeot 3008.jpeg',
    },
    {
        nom: 'BMW M4', categorie: 'Sport', places: 4, carburant: 'Essence', boite: 'Manuelle',
        annee: 2020, moteur: '3.0L Bi-turbo', vitesseMax: '280 km/h', puissance: '431 ch',
        acceleration: '4,3 s', usageIdeal: 'Plaisir de conduite et occasions spéciales',
        pointsForts: ['Sportive', 'Accélération forte', 'Look exclusif'],
        statut: statut_vehicule_enum_1.StatutVehicule.LIMITED, prixLocation: 80000, prixAchat: 35000000,
        image: '/images/bmw.jpg',
    },
    {
        nom: 'Mercedes CLA', categorie: 'Berline', places: 5, carburant: 'Diesel', boite: 'Automatique',
        annee: 2021, moteur: '2.0L CDI', vitesseMax: '235 km/h', puissance: '190 ch',
        acceleration: '7,3 s', usageIdeal: 'Business, ville et sorties élégantes',
        pointsForts: ['Élégante', 'Confortable', 'Faible consommation'],
        statut: statut_vehicule_enum_1.StatutVehicule.AVAILABLE, prixLocation: 70000, prixAchat: 28000000,
        image: '/images/mercedes.jpg',
    },
    {
        nom: 'Ferrari 488', categorie: 'Supercar', places: 2, carburant: 'Essence', boite: 'Automatique',
        annee: 2019, moteur: '3.9L V8 Bi-turbo', vitesseMax: '330 km/h', puissance: '670 ch',
        acceleration: '3,0 s', usageIdeal: 'Mariage, shooting et expérience prestige',
        pointsForts: ['Très rare', 'Performance extrême', 'Image prestige'],
        statut: statut_vehicule_enum_1.StatutVehicule.LIMITED, prixLocation: 350000, prixAchat: 250000000,
        image: '/images/Ferrari.jpg',
    },
];
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const vehiculesService = app.get(vehicules_service_1.VehiculesService);
    const usersService = app.get(users_service_1.UsersService);
    console.log('Insertion des vehicules...');
    const existants = await vehiculesService.findAll();
    if (existants.length === 0) {
        for (const v of vehicules) {
            await vehiculesService.create(v);
        }
        console.log(`${vehicules.length} vehicules inseres.`);
    }
    else {
        console.log('Des vehicules existent deja, insertion ignoree.');
    }
    console.log('Creation du compte admin de test...');
    const adminExistant = await usersService.findByEmail('admin@movia.sn');
    if (!adminExistant) {
        await usersService.create({
            nom: 'Administrateur Movia',
            email: 'admin@movia.sn',
            password: 'Admin123!',
        }, role_enum_1.Role.ADMIN);
        console.log('Compte admin cree -> email: admin@movia.sn / mot de passe: Admin123!');
    }
    else {
        console.log('Le compte admin existe deja.');
    }
    await app.close();
    console.log('Seed termine.');
}
seed().catch((err) => {
    console.error('Erreur pendant le seed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map