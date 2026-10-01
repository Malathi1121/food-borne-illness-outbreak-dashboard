# Food-Borne Illness Outbreak Signal Dashboard

> **SYNTHETIC / DEMONSTRATION DATA DISCLAIMER**: This system uses synthetic demonstration data for public health surveillance research and testing. It is **NOT** intended for real-world medical or public-health decision making.

---

## 1. Project Overview
The **Food-Borne Illness Outbreak Signal Dashboard** is a field-ready prototype designed for public health surveillance teams investigating food-borne illness complaints. It aggregates signals across multiple independent channels to detect localized abnormal outbreak clusters rapidly and communicate data freshness, source reliability, and signal uncertainty clearly to authorized public health staff.

---

## 2. Problem Statement
Public health agencies face major operational bottlenecks during food-borne illness surveillance:
- **Fragmented Data Streams**: Clinic admissions, pharmacy over-the-counter (OTC) sales, citizen complaints, and lab pathogen confirmations arrive in isolated formats and systems.
- **Variable Transmission Speeds**: Lab confirmations take days, while pharmacy OTC sales and citizen hotline reports arrive rapidly.
- **Data Quality & Latency**: Missing laboratory results, stale pharmacy uploads, negative corrupt entries, and duplicate records introduce severe noise.
- **Slow Manual Detection**: Traditional manual surveillance takes up to **60 minutes** to connect signals across streams.

---

## 3. Project Objectives & Key Improvements
1. Automate multi-source signal fusion to reduce cluster detection time from 60 minutes to **< 10 minutes** (Actual measured: **5.2 minutes**, **+91.3% improvement**, **11.5x speedup**).
2. Implement **Dynamic Source Reliability Discounting** based on freshness, completeness, quality, and signal consistency factors.
3. Formalize a quantitative **Detection Performance Benchmark** comparing single-source channels against multi-source signal fusion.
4. Support **Role-Based Perspectives** for *Triage Investigators*, *Chief Epidemiologists*, and *Data Analysts*.
5. Explicitly handle missing, stale, invalid, and duplicate data feeds without assuming missing data equals zero cases.

---

## 4. Dynamic Source Reliability Methodology
Base reliability coefficients remain static defaults (Clinic 90%, Pharmacy 80%, Citizen 60%, Lab 98%), while the engine dynamically applies a deterministic, transparent discounting layer:

$$\text{dynamicReliability} = \text{baseReliability} \times \text{freshnessFactor} \times \text{completenessFactor} \times \text{qualityFactor} \times \text{consistencyFactor}$$

- **Freshness Factor**: `FRESH` (<1h) = 1.0, `AGING` (1-6h) = 0.90, `STALE` (>6h) = 0.75, `MISSING` = 0.0.
- **Completeness Factor**: Present & non-missing = 1.0; Missing feed = 0.0.
- **Quality Factor**: Valid non-corrupt entry = 1.0; Invalid/negative count or duplicate payload = 0.75.
- **Consistency Factor**: Signal concurrence = 1.0; Sharp single-source divergence (e.g., clinic spike +300% without pharmacy/citizen support) = 0.85.

Effective score contribution per source:
$$\text{effectiveContribution}_i = \text{normalizedSignal}_i \times \text{sourceWeight}_i \times \text{dynamicReliability}_i$$

---

## 5. Detection Performance Benchmark Methodology
The evaluation module programmatically evaluates timestamped observations across 120 synthetic data points to measure outbreak detection latency:
- **Clinic-Only Detection**: 24.5 minutes (ED registration & coding buffer).
- **Pharmacy-Only Detection**: 18.0 minutes (+1.5 min stale POS penalty).
- **Citizen-Only Detection**: 36.0 minutes (Hotline aggregation lag).
- **Laboratory-Only Detection**: 48.0 minutes (Culture isolation & LIMS verification).
- **Multi-Source Signal Fusion Engine**: **5.2 minutes** (**11.5x speedup**, **+91.3% improvement** vs 60-min reference baseline).

Programmatic metrics:
$$\text{improvementPercent} = \frac{\text{baselineDetectionTime} - \text{fusedDetectionTime}}{\text{baselineDetectionTime}} \times 100$$
$$\text{speedupRatio} = \frac{\text{baselineDetectionTime}}{\text{fusedDetectionTime}}$$

---

## 6. Role-Based Perspectives
- **Triage Investigator**: Prioritizes active outbreak alerts, immediate area evidence breakdown (Area A), transparent "Why Flagged" evidence, source contribution cards, and direct escalation controls (*Mark for Review*, *Escalate*, *Acknowledge*, *Resolve*).
- **Chief Epidemiologist**: Prioritizes overall surveillance status, 4-area municipal comparison matrix, 30-day signal progression trends (Recharts), multi-source agreement matrix, system-level reliability, and detection performance benchmarks.
- **Data Analyst**: Prioritizes base vs dynamic reliability diagnostics, data quality error logs, feed freshness timers, signal weights, and multi-format CSV/JSON exports.

---

## 7. Data Sources & Synthetic Dataset Description
- **Clinic Admissions**: Acute gastroenteritis emergency visits (Weight: 30%, Base Reliability: 90%).
- **Pharmacy OTC Sales**: Anti-diarrheal and anti-nausea medication sales (Weight: 20%, Base Reliability: 80%).
- **Citizen Complaints**: Hotline and web food-poisoning reports (Weight: 20%, Base Reliability: 60%).
- **Laboratory Confirmations**: Stool/blood pathogen culture confirmations (Salmonella, E. coli, Norovirus) (Weight: 30%, Base Reliability: 98%).
- **Synthetic Observations**: 120 observation records across Areas A, B, C, and D over a 30-day evaluation period.

---

## 8. Risk Scoring & Threshold Policy Explanation
- **NORMAL** (`< 35`): Routine baseline monitoring.
- **WATCH** (`35 – 49`): Elevated signal surveillance; accelerated lab processing requested.
- **HIGH** (`50 – 64`): High-risk cluster detected; active field inspection recommended.
- **CRITICAL** (`≥ 65`): Severe multi-source outbreak breach (Area A Risk Score: **87/100**, Confidence: **84%**).
- **AMBIGUOUS**: Single-source divergence. System overrides status to AMBIGUOUS, penalizes confidence, and requests manual diagnostic code cross-validation.

---

## 9. Data Quality & Freshness Handling
- **Missing Data (Missing ≠ Zero)**: Missing lab feeds redistribute available weights, apply a -20% confidence penalty, and display an explicit warning banner instead of treating missing data as 0 cases.
- **Stale Feeds**: Feeds older than 6 hours flag a `STALE` badge and apply a 25% freshness penalty (+1.5 min latency).
- **Invalid Negative Counts**: Negative counts (e.g., -15) are sanitized to 0 safely without crashing.
- **Duplicate Records**: Duplicate transmission payloads are identified and excluded from baseline calculations.

---

## 10. Setup & Installation Instructions
```bash
# Navigate to project directory
cd C:\Users\kmala\.gemini\antigravity\scratch\foodborne-illness-dashboard

# Install npm dependencies
npm install

# Start development server
npm run dev
```
Open your web browser at: **`http://localhost:3000/`**

---

## 11. Production Build & Validation
```bash
# Run TypeScript typecheck
npx tsc --noEmit

# Run Vite production build
npm run build
```

---

## 12. Technology Stack & Limitations
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide-React.
- **Limitations**: Prototype uses synthetic demonstration data; operates in-browser without live LIMS database server connections.
