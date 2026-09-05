import React, { createContext, useContext, useMemo, useState } from 'react';
import { getScenarioSnapshot } from '../data/demoScenarios';
import { runMultiSourceFusion } from '../services/fusionEngine';
import { INITIAL_ESCALATION_RECORDS, updateEscalationStatus } from '../services/escalationService';
import {
  AreaData,
  DemoScenarioId,
  EscalationRecord,
  FusionResult,
  Role,
  SignalWeights,
  SourceReliability
} from '../types';

interface AppContextType {
  activeScenarioId: DemoScenarioId;
  setActiveScenarioId: (id: DemoScenarioId) => void;
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  weights: SignalWeights;
  setWeights: React.Dispatch<React.SetStateAction<SignalWeights>>;
  reliability: SourceReliability;
  setReliability: React.Dispatch<React.SetStateAction<SourceReliability>>;
  referenceBaselineMinutes: number;
  setReferenceBaselineMinutes: (mins: number) => void;
  areaDataList: AreaData[];
  fusionResult: FusionResult;
  escalationRecords: EscalationRecord[];
  handleEscalationChange: (id: string, newStatus: EscalationRecord['status']) => void;
  selectedAreaId: string | null;
  setSelectedAreaId: (id: string | null) => void;
  isInvestigationModalOpen: boolean;
  setIsInvestigationModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<DemoScenarioId>('scenario_outbreak');
  const [activeRole, setActiveRole] = useState<Role>('investigator');
  const [weights, setWeights] = useState<SignalWeights>({
    clinic: 0.30,
    pharmacy: 0.20,
    citizen: 0.20,
    laboratory: 0.30
  });
  const [reliability, setReliability] = useState<SourceReliability>({
    clinic: 0.90,
    pharmacy: 0.80,
    citizen: 0.60,
    laboratory: 0.98
  });
  const [referenceBaselineMinutes, setReferenceBaselineMinutes] = useState<number>(60);
  const [escalationRecords, setEscalationRecords] = useState<EscalationRecord[]>(INITIAL_ESCALATION_RECORDS);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>('area_a');
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState<boolean>(false);

  // Derive active scenario data snapshot
  const areaDataList = useMemo(() => {
    return getScenarioSnapshot(activeScenarioId);
  }, [activeScenarioId]);

  // Compute live multi-source signal fusion
  const fusionResult = useMemo(() => {
    return runMultiSourceFusion(areaDataList, weights, reliability);
  }, [areaDataList, weights, reliability]);

  const handleEscalationChange = (id: string, newStatus: EscalationRecord['status']) => {
    setEscalationRecords(prev => updateEscalationStatus(prev, id, newStatus, activeRole));
  };

  return (
    <AppContext.Provider
      value={{
        activeScenarioId,
        setActiveScenarioId,
        activeRole,
        setActiveRole,
        weights,
        setWeights,
        reliability,
        setReliability,
        referenceBaselineMinutes,
        setReferenceBaselineMinutes,
        areaDataList,
        fusionResult,
        escalationRecords,
        handleEscalationChange,
        selectedAreaId,
        setSelectedAreaId,
        isInvestigationModalOpen,
        setIsInvestigationModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
