export interface SectorKnowledge {
  sector: string;
  commonObjections: string[];
  bestClosingStrategy: string;
  averageSalesCycleDays: number;
}

/**
 * Knowledge Hub™ (Module 06)
 * Adapts Fiko's intelligence based on the specific industry of the Tenant.
 */
export class SectorHub {
  static getSectorKnowledge(sector: string): SectorKnowledge {
    console.log(`📚 KNOWLEDGE HUB: Loading intelligence for sector [${sector}]`);

    if (sector === 'Immobilier') {
      return {
        sector: 'Immobilier',
        commonObjections: ['Prix des biens', 'Taux de crédit', 'Emplacement'],
        bestClosingStrategy: 'Visite virtuelle avant rendez-vous physique.',
        averageSalesCycleDays: 45
      };
    }

    // Default fallback
    return {
      sector: 'Général',
      commonObjections: ['Prix', 'Temps'],
      bestClosingStrategy: 'Démonstration de valeur immédiate.',
      averageSalesCycleDays: 14
    };
  }
}
