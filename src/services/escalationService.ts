import { EscalationRecord, RiskLevel, Role } from '../types';

export const INITIAL_ESCALATION_RECORDS: EscalationRecord[] = [
  {
    id: 'esc_area_a_01',
    areaId: 'area_a',
    areaName: 'Area A (Riverside District)',
    riskLevel: 'CRITICAL',
    status: 'ESCALATED',
    reason: 'Multi-source surge detected: Clinic cases 35 (base 8, +338%), Pharmacy 55 (base 20, +175%), Citizen 21 (base 3, +600%), 5 Lab confirmed cultures.',
    assignedRoleOrTeam: 'Outbreak Response Team Alpha & Field Epidemiology Unit',
    timestamp: '2026-09-03 10:15 AM',
    history: [
      { action: 'AUTOMATED_ALERT_TRIGGERED', role: 'System Engine', timestamp: '2026-09-03 10:00 AM', note: 'Risk score 87/100 breached threshold (>=65).' },
      { action: 'MARKED_FOR_REVIEW', role: 'Triage Investigator', timestamp: '2026-09-03 10:08 AM', note: 'Cross-checked emergency department admission logs.' },
      { action: 'ESCALATED', role: 'Chief Epidemiologist', timestamp: '2026-09-03 10:15 AM', note: 'Activated Level 2 Rapid Outbreak Response Protocol.' }
    ]
  },
  {
    id: 'esc_area_b_02',
    areaId: 'area_b',
    areaName: 'Area B (Central Metro)',
    riskLevel: 'AMBIGUOUS',
    status: 'UNDER_REVIEW',
    reason: 'Clinic cases spiked by +300% without supporting pharmacy OTC sales or lab confirmations.',
    assignedRoleOrTeam: 'Senior Epidemiologist (Data Validation)',
    timestamp: '2026-09-03 11:30 AM',
    history: [
      { action: 'AUTOMATED_ALERT_TRIGGERED', role: 'System Engine', timestamp: '2026-09-03 11:30 AM', note: 'Single-source signal discrepancy flagged.' }
    ]
  }
];

export function updateEscalationStatus(
  records: EscalationRecord[],
  recordId: string,
  newStatus: EscalationRecord['status'],
  userRole: Role
): EscalationRecord[] {
  return records.map(rec => {
    if (rec.id !== recordId) return rec;

    const actionNameMap: Record<EscalationRecord['status'], string> = {
      UNASSIGNED: 'RESET_TO_UNASSIGNED',
      UNDER_REVIEW: 'MARKED_FOR_REVIEW',
      ESCALATED: 'ESCALATED_TO_RESPONSE_TEAM',
      ACKNOWLEDGED: 'ACKNOWLEDGED_BY_INVESTIGATOR',
      RESOLVED: 'CASE_RESOLVED_AND_CLOSED'
    };

    const roleNameMap: Record<Role, string> = {
      investigator: 'Triage Investigator',
      chief_epidemiologist: 'Chief Epidemiologist',
      analyst: 'Data Analyst'
    };

    return {
      ...rec,
      status: newStatus,
      history: [
        ...rec.history,
        {
          action: actionNameMap[newStatus],
          role: roleNameMap[userRole],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Status updated to ${newStatus} by ${roleNameMap[userRole]}.`
        }
      ]
    };
  });
}
