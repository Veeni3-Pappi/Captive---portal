import React, { useState } from 'react';
import { WifiPlan, PlanCategory } from '../types';
import { WIFI_PLANS } from '../config/site';
import { Badge } from './ui/Badge';
import { Clock, Check, Fire, Star, Lightning } from '@phosphor-icons/react';

interface PlanSelectorProps {
  selectedPlan: WifiPlan;
  onSelectPlan: (plan: WifiPlan) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlan,
  onSelectPlan,
}) => {
  const [activeCategory, setActiveCategory] = useState<PlanCategory>('all');

  const categories: { id: PlanCategory; label: string }[] = [
    { id: 'all', label: 'All Plans' },
    { id: 'hourly', label: 'Hourly' },
    { id: 'daily', label: 'Daily' },
    { id: 'weekly_monthly', label: 'Weekly & Monthly' },
  ];

  const filteredPlans = activeCategory === 'all'
    ? WIFI_PLANS
    : WIFI_PLANS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Plan Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {filteredPlans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-150 text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-2 border-emerald-500 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Badge if present */}
              {plan.badge && (
                <div className="absolute -top-2.5 right-3 z-10">
                  {plan.badge === 'Most Popular' && (
                    <Badge variant="emerald" className="shadow-sm">
                      <Star size={12} weight="fill" className="text-amber-300" />
                      Most Popular
                    </Badge>
                  )}
                  {plan.badge === 'Best Value' && (
                    <Badge variant="amber" className="shadow-sm">
                      <Fire size={12} weight="fill" className="text-amber-400" />
                      Best Value
                    </Badge>
                  )}
                </div>
              )}

              {/* Card Header: Duration & Checkbox */}
              <div>
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <h3 className="font-bold text-sm text-slate-100 tracking-tight leading-snug">
                    {plan.name}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-800/50'
                    }`}
                  >
                    {isSelected && <Check size={12} weight="bold" />}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-3">
                  <Clock size={11} className="text-slate-500" />
                  {plan.durationMinutes >= 1440
                    ? `${Math.round(plan.durationMinutes / 1440)} Days Unlimited`
                    : `${plan.durationMinutes} Minutes`}
                </p>
              </div>

              {/* Card Footer: Price & Speed */}
              <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between mt-auto">
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-400 tracking-tight">
                    Ksh {plan.priceKes}/=
                  </span>
                </div>
                <div className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5">
                  <Lightning size={10} weight="fill" className="text-emerald-400" />
                  Fast
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
