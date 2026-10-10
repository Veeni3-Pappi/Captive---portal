import React, { useState } from 'react';
import { WifiPlan, PlanCategory } from '../types';
import { WIFI_PLANS } from '../config/site';
import { Sparkle } from '@phosphor-icons/react';

interface PlanTableProps {
  selectedPlan: WifiPlan;
  onSelectPlan: (plan: WifiPlan) => void;
}

const CATEGORIES: { id: PlanCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly_monthly', label: 'Weekly & Monthly' },
];

export const PlanTable: React.FC<PlanTableProps> = ({ selectedPlan, onSelectPlan }) => {
  const [activeCategory, setActiveCategory] = useState<PlanCategory>('all');

  const filteredPlans =
    activeCategory === 'all'
      ? WIFI_PLANS
      : WIFI_PLANS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ paddingRight: '28px' }}>
      {/* Section title */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.01em' }}>
          Access Plans
        </div>
        <div style={{ fontSize: '12px', color: '#4a5468', marginTop: '2px' }}>
          All plans include unlimited data · Up to 30 Mbps
        </div>
      </div>

      {/* Category filter */}
      <div className="cat-tabs" style={{ borderBottom: '1px solid #1b1f2b', marginBottom: '0' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-tab${activeCategory === cat.id ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Plan table */}
      <table className="plan-table">
        <thead>
          <tr>
            <th style={{ width: 32, paddingLeft: 16 }}></th>
            <th>Plan</th>
            <th>Duration</th>
            <th>Data</th>
            <th style={{ textAlign: 'right' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.map((plan) => {
            const isSelected = plan.id === selectedPlan.id;
            return (
              <tr
                key={plan.id}
                className={isSelected ? 'selected' : ''}
                onClick={() => onSelectPlan(plan)}
              >
                {/* Radio */}
                <td style={{ paddingLeft: 16, paddingRight: 8 }}>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #34d399' : '2px solid #2a3347',
                      flexShrink: 0,
                      transition: 'border 0.12s ease',
                    }}
                  />
                </td>

                {/* Plan name + badge */}
                <td>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>
                    {plan.name}
                    {plan.badge && (
                      <span className="plan-badge">{plan.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4a5468', marginTop: '1px' }}>
                    {plan.speedLabel}
                  </div>
                </td>

                {/* Duration */}
                <td>
                  <span style={{ fontSize: '12px', color: '#8a95a8' }}>
                    {plan.durationLabel}
                  </span>
                </td>

                {/* Data */}
                <td>
                  <span style={{ fontSize: '12px', color: '#8a95a8' }}>
                    Unlimited
                  </span>
                </td>

                {/* Price */}
                <td style={{ textAlign: 'right' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: isSelected ? '#34d399' : '#c9d1e0',
                    }}
                  >
                    Ksh {plan.priceKes}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Free trial notice */}
      <div
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          borderTop: '1px solid #1b1f2b',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: '#4a5468',
        }}
      >
        <Sparkle size={13} />
        <span>
          New? Try a free 5-minute speed test before purchasing.{' '}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#34d399',
              fontSize: '11px',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={() => {
              // handled by parent
            }}
          >
            Claim free pass →
          </button>
        </span>
      </div>
    </div>
  );
};
