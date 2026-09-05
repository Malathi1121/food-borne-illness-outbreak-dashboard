import { AreaData, DemoScenario } from '../types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'scenario_outbreak',
    name: 'Scenario 2: Localized Outbreak (Area A)',
    description: 'Area A demonstrates an escalating multi-source spike (Clinic +67%, Pharmacy +35%, Citizen +119%, 5 Lab Confirmations). Overall Risk: HIGH (84/100).',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  },
  {
    id: 'scenario_normal',
    name: 'Scenario 1: Normal Baseline',
    description: 'All 4 signal sources are reporting baseline values across all 4 sectors. Overall Risk: NORMAL (18/100), High Confidence (96%).',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'scenario_missing_lab',
    name: 'Scenario 3: Missing Laboratory Data',
    description: 'Laboratory feed is offline/unavailable. System redistributes signal weights without assuming zero. Confidence reduced from 94% to 68%.',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    id: 'scenario_stale_pharmacy',
    name: 'Scenario 4: Stale Pharmacy Data',
    description: 'Pharmacy feed updated 8 hours ago (STALE). System flags data freshness warning and applies a 25% freshness penalty to confidence.',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    id: 'scenario_conflicting',
    name: 'Scenario 5: Conflicting Signals',
    description: 'Clinic cases spike by 300% in Area B, but Pharmacy, Citizen, and Lab reports remain normal. System triggers AMBIGUOUS status.',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }
];

export function getScenarioSnapshot(scenarioId: string): AreaData[] {
  switch (scenarioId) {
    case 'scenario_normal':
      return [
        {
          areaId: 'area_a', areaName: 'Area A (Riverside District)', population: 145000,
          clinic: { current: 43, baseline: 43, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 109, baseline: 109, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 16, baseline: 16, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_b', areaName: 'Area B (Central Metro)', population: 320000,
          clinic: { current: 18, baseline: 18, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 45, baseline: 45, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 7, baseline: 7, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_c', areaName: 'Area C (Harbor North)', population: 98000,
          clinic: { current: 5, baseline: 5, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 14, baseline: 14, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 2, baseline: 2, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_d', areaName: 'Area D (Westside Heights)', population: 210000,
          clinic: { current: 12, baseline: 12, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 30, baseline: 30, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 4, baseline: 4, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        }
      ];

    case 'scenario_outbreak':
      return [
        {
          areaId: 'area_a', areaName: 'Area A (Riverside District)', population: 145000,
          clinic: { current: 72, baseline: 43, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },       // +67%
          pharmacy: { current: 147, baseline: 109, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },   // +35%
          citizen: { current: 35, baseline: 16, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },     // +119%
          laboratory: { current: 5, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }    // 5 confirmed
        },
        {
          areaId: 'area_b', areaName: 'Area B (Central Metro)', population: 320000,
          clinic: { current: 19, baseline: 18, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 46, baseline: 45, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 8, baseline: 7, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_c', areaName: 'Area C (Harbor North)', population: 98000,
          clinic: { current: 6, baseline: 5, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 15, baseline: 14, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 2, baseline: 2, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_d', areaName: 'Area D (Westside Heights)', population: 210000,
          clinic: { current: 12, baseline: 12, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 31, baseline: 30, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 4, baseline: 4, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        }
      ];

    case 'scenario_missing_lab':
      return [
        {
          areaId: 'area_a', areaName: 'Area A (Riverside District)', population: 145000,
          clinic: { current: 72, baseline: 43, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 147, baseline: 109, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 35, baseline: 16, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: -1, baseline: 0, freshness: 'MISSING', lastUpdatedMinutesAgo: 2880 }
        },
        {
          areaId: 'area_b', areaName: 'Area B (Central Metro)', population: 320000,
          clinic: { current: 18, baseline: 18, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 45, baseline: 45, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 7, baseline: 7, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: -1, baseline: 0, freshness: 'MISSING', lastUpdatedMinutesAgo: 2880 }
        },
        {
          areaId: 'area_c', areaName: 'Area C (Harbor North)', population: 98000,
          clinic: { current: 5, baseline: 5, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 14, baseline: 14, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 2, baseline: 2, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: -1, baseline: 0, freshness: 'MISSING', lastUpdatedMinutesAgo: 2880 }
        },
        {
          areaId: 'area_d', areaName: 'Area D (Westside Heights)', population: 210000,
          clinic: { current: 12, baseline: 12, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 30, baseline: 30, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 4, baseline: 4, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: -1, baseline: 0, freshness: 'MISSING', lastUpdatedMinutesAgo: 2880 }
        }
      ];

    case 'scenario_stale_pharmacy':
      return [
        {
          areaId: 'area_a', areaName: 'Area A (Riverside District)', population: 145000,
          clinic: { current: 72, baseline: 43, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 147, baseline: 109, freshness: 'STALE', lastUpdatedMinutesAgo: 480 },
          citizen: { current: 35, baseline: 16, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 5, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_b', areaName: 'Area B (Central Metro)', population: 320000,
          clinic: { current: 18, baseline: 18, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 45, baseline: 45, freshness: 'STALE', lastUpdatedMinutesAgo: 480 },
          citizen: { current: 7, baseline: 7, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_c', areaName: 'Area C (Harbor North)', population: 98000,
          clinic: { current: 5, baseline: 5, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 14, baseline: 14, freshness: 'STALE', lastUpdatedMinutesAgo: 480 },
          citizen: { current: 2, baseline: 2, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_d', areaName: 'Area D (Westside Heights)', population: 210000,
          clinic: { current: 12, baseline: 12, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 30, baseline: 30, freshness: 'STALE', lastUpdatedMinutesAgo: 480 },
          citizen: { current: 4, baseline: 4, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        }
      ];

    case 'scenario_conflicting':
      return [
        {
          areaId: 'area_b', areaName: 'Area B (Central Metro)', population: 320000,
          clinic: { current: 72, baseline: 18, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },      // +300% Clinic spike
          pharmacy: { current: 46, baseline: 45, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },   // Normal pharmacy
          citizen: { current: 7, baseline: 7, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },     // Normal citizen
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }    // No lab confirmation
        },
        {
          areaId: 'area_a', areaName: 'Area A (Riverside District)', population: 145000,
          clinic: { current: 43, baseline: 43, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 109, baseline: 109, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 16, baseline: 16, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_c', areaName: 'Area C (Harbor North)', population: 98000,
          clinic: { current: 5, baseline: 5, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 14, baseline: 14, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 2, baseline: 2, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        },
        {
          areaId: 'area_d', areaName: 'Area D (Westside Heights)', population: 210000,
          clinic: { current: 12, baseline: 12, freshness: 'FRESH', lastUpdatedMinutesAgo: 5 },
          pharmacy: { current: 30, baseline: 30, freshness: 'FRESH', lastUpdatedMinutesAgo: 15 },
          citizen: { current: 4, baseline: 4, freshness: 'FRESH', lastUpdatedMinutesAgo: 10 },
          laboratory: { current: 0, baseline: 0, freshness: 'FRESH', lastUpdatedMinutesAgo: 30 }
        }
      ];

    default:
      return getScenarioSnapshot('scenario_outbreak');
  }
}
