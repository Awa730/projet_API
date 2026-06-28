import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { VehiculesService } from '../vehicules/vehicules.service';
import { UsersService } from '../users/users.service';
import { StatutVehicule } from '../common/enums/statut-vehicule.enum';
import { Role } from '../common/enums/role.enum';

// Liste reprise telle quelle de src/landing/VehiculesSection.tsx (frontend Movia Automobile)
// paysOrigine = code ISO Alpha-2 du pays de la marque, utilise par /api/vehicules/:id/origine
const vehicules = [
  {
    nom: 'BMW X3',
    categorie: 'SUV',
    places: 5,
    carburant: 'Diesel',
    boite: 'Automatique',
    annee: 2022,
    moteur: '2.0L TwinPower',
    vitesseMax: '230 km/h',
    puissance: '190 ch',
    acceleration: '8,0 s',
    usageIdeal: 'Voyage, famille et rendez-vous pro',
    pointsForts: ['Confort premium', 'Tenue de route', 'Grand coffre'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 65000,
    prixAchat: 22000000,
    image: '/images/BMW X3.jpeg',
    paysOrigine: 'DE',
  },
  {
    nom: 'Haval H6',
    categorie: 'SUV',
    places: 5,
    carburant: 'Essence',
    boite: 'Automatique',
    annee: 2023,
    moteur: '1.5L Turbo',
    vitesseMax: '180 km/h',
    puissance: '150 ch',
    acceleration: '9,8 s',
    usageIdeal: 'Déplacements urbains et longs trajets',
    pointsForts: ['Très spacieux', 'Caméra 360', 'Bon rapport prix'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 40000,
    prixAchat: 15000000,
    image: '/images/Haval H6.jpeg',
    paysOrigine: 'CN',
  },
  {
    nom: 'Mercedes GLE Coupé',
    categorie: 'Luxe',
    places: 5,
    carburant: 'Diesel',
    boite: 'Automatique',
    annee: 2021,
    moteur: '3.0L 6 cylindres',
    vitesseMax: '250 km/h',
    puissance: '330 ch',
    acceleration: '5,7 s',
    usageIdeal: 'Événements, business et confort haut de gamme',
    pointsForts: ['Intérieur luxe', 'Puissance', 'Silhouette coupé'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 120000,
    prixAchat: 55000000,
    image: '/images/Mercedes GLE coupé.jpeg',
    paysOrigine: 'DE',
  },
  {
    nom: 'Hyundai Santa Fe',
    categorie: 'SUV',
    places: 7,
    carburant: 'Diesel',
    boite: 'Automatique',
    annee: 2020,
    moteur: '2.2L CRDi',
    vitesseMax: '205 km/h',
    puissance: '200 ch',
    acceleration: '9,2 s',
    usageIdeal: 'Familles nombreuses et voyages interurbains',
    pointsForts: ['7 places', 'Climatisation arrière', 'Très confortable'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 50000,
    prixAchat: 18000000,
    image: '/images/Hyundai Santa Fe.jpeg',
    paysOrigine: 'KR',
  },
  {
    nom: 'Hyundai Creta',
    categorie: 'Citadine',
    places: 5,
    carburant: 'Essence',
    boite: 'Manuelle',
    annee: 2022,
    moteur: '1.5L',
    vitesseMax: '170 km/h',
    puissance: '115 ch',
    acceleration: '11,8 s',
    usageIdeal: 'Ville, petits budgets et trajets quotidiens',
    pointsForts: ['Économique', 'Facile à conduire', 'Compacte'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 25000,
    prixAchat: 10000000,
    image: '/images/Hyundai Creta.jpeg',
    paysOrigine: 'KR',
  },
  {
    nom: 'Peugeot 3008',
    categorie: 'SUV',
    places: 5,
    carburant: 'Diesel',
    boite: 'Automatique',
    annee: 2021,
    moteur: '1.5L BlueHDi',
    vitesseMax: '192 km/h',
    puissance: '130 ch',
    acceleration: '10,8 s',
    usageIdeal: 'Conduite confortable avec faible consommation',
    pointsForts: ['Économe', 'Design moderne', 'Aide à la conduite'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 45000,
    prixAchat: 16000000,
    image: '/images/Peugeot 3008.jpeg',
    paysOrigine: 'FR',
  },
  {
    nom: 'BMW M4',
    categorie: 'Sport',
    places: 4,
    carburant: 'Essence',
    boite: 'Manuelle',
    annee: 2020,
    moteur: '3.0L Bi-turbo',
    vitesseMax: '280 km/h',
    puissance: '431 ch',
    acceleration: '4,3 s',
    usageIdeal: 'Plaisir de conduite et occasions spéciales',
    pointsForts: ['Sportive', 'Accélération forte', 'Look exclusif'],
    statut: StatutVehicule.LIMITED,
    prixLocation: 80000,
    prixAchat: 35000000,
    image: '/images/bmw.jpg',
    paysOrigine: 'DE',
  },
  {
    nom: 'Mercedes CLA',
    categorie: 'Berline',
    places: 5,
    carburant: 'Diesel',
    boite: 'Automatique',
    annee: 2021,
    moteur: '2.0L CDI',
    vitesseMax: '235 km/h',
    puissance: '190 ch',
    acceleration: '7,3 s',
    usageIdeal: 'Business, ville et sorties élégantes',
    pointsForts: ['Élégante', 'Confortable', 'Faible consommation'],
    statut: StatutVehicule.AVAILABLE,
    prixLocation: 70000,
    prixAchat: 28000000,
    image: '/images/mercedes.jpg',
    paysOrigine: 'DE',
  },
  {
    nom: 'Ferrari 488',
    categorie: 'Supercar',
    places: 2,
    carburant: 'Essence',
    boite: 'Automatique',
    annee: 2019,
    moteur: '3.9L V8 Bi-turbo',
    vitesseMax: '330 km/h',
    puissance: '670 ch',
    acceleration: '3,0 s',
    usageIdeal: 'Mariage, shooting et expérience prestige',
    pointsForts: ['Très rare', 'Performance extrême', 'Image prestige'],
    statut: StatutVehicule.LIMITED,
    prixLocation: 350000,
    prixAchat: 250000000,
    image: '/images/Ferrari.jpg',
    paysOrigine: 'IT',
  },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const vehiculesService = app.get(VehiculesService);
  const usersService = app.get(UsersService);

  console.log('Insertion des vehicules...');
  const existants = await vehiculesService.findAll();
  if (existants.length === 0) {
    for (const v of vehicules) {
      await vehiculesService.create(v);
    }
    console.log(`${vehicules.length} vehicules inseres.`);
  } else {
    console.log('Des vehicules existent deja, insertion ignoree.');
  }

  console.log('Creation du compte admin de test...');
  const adminExistant = await usersService.findByEmail('admin@movia.sn');
  if (!adminExistant) {
    await usersService.create(
      {
        nom: 'Administrateur Movia',
        email: 'admin@movia.sn',
        password: 'Admin123!',
      },
      Role.ADMIN,
    );
    console.log(
      'Compte admin cree -> email: admin@movia.sn / mot de passe: Admin123!',
    );
  } else {
    console.log('Le compte admin existe deja.');
  }

  await app.close();
  console.log('Seed termine.');
}

seed().catch((err) => {
  console.error('Erreur pendant le seed:', err);
  process.exit(1);
});
