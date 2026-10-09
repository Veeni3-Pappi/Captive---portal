import React, { useState } from 'react';
import { WifiPlan, PlanCategory } from '../types';
import { WIFI_PLANS } from '../config/site';
import { Clock, Star, Fire, Lightning, Check, DeviceMobile } from '@phosphor-icons/react';

interface PlanSelectorProps {
  selectedPlan: WifiPlan;
  onSelectPlan: (plan: WifiPlan) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlan,
  onSelectPlan,
}) => {
  const [activeCategory, setActiveCategory] = useState<PlanCategory>('all');

  const categories: { id: PlanCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Tiers', count: WIFI_PLANS.length },
    { id: 'hourly', label: 'Hourly', count: WIFI_PLANS.filter((p) => p.category === 'hourly').length },
    { id: 'daily', label: 'Daily', count: WIFI_PLANS.filter((p) => p.category === 'daily').length },
    { id: 'weekly_monthly', label: 'Weekly & Monthly', count: WIFI_PLANS.filter((p) => p.category === 'weekly_monthly').length },
  ];

  const filteredPlans = activeCategory === 'all'
    ? WIFI_PLANS
    : WIFI_PLANS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-3.5">
      {/* Category Segmented Controller */}
      <div className="flex items-center gap-1 p-1 bg-[#121620] rounded-xl border border-[#1f2738] overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-[#1e2738] text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800/60 text-slate-500'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Plan Cards List - Nixtio Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredPlans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`group relative cursor-pointer rounded-xl p-3.5 transition-all duration-150 text-left border ${
                isSelected
                  ? 'bg-[#151c28] border-emerald-500/80 shadow-md shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                  : 'bg-[#11151f] hover:bg-[#141924] border-[#1f2738] hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Radio + Plan Details */}
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-slate-600 bg-slate-900 group-hover:border-slate-500'
                    }`}
                  >
                    {isSelected && <Check size={10} weight="bold" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-slate-100 tracking-tight">
                        {plan.name}
                      </span>
                      {plan.badge === 'Most Popular' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                          <Star size={10} weight="fill" className="text-amber-400" />
                          Popular
                        </span>
                      )}
                      {plan.badge === 'Best Value' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                          <Fire size={10} weight="fill" className="text-amber-400" />
                          Value
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-500" />
                        {plan.durationMinutes >= 1440
                          ? `${Math.round(plan.durationMinutes / 1440)} Days`
                          : `${plan.durationMinutes} Mins`}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <Lightning size={12} className="text-emerald-400" weight="fill" />
                        Unlimited
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <DeviceMobile size={11} className="text-slate-500" />
                        {plan.devices} device
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    Ksh {plan.priceKes}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    net
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
