export type PlanCategory = 'all' | 'hourly' | 'daily' | 'weekly_monthly';

export interface WifiPlan {
  id: string;
  name: string;
  durationLabel: string;
  category: 'hourly' | 'daily' | 'weekly_monthly';
  durationMinutes: number;
  priceKes: number;
  unlimitedData: boolean;
  speedLabel: string;
  devices: number;
  badge?: 'Most Popular' | 'Best Value' | null;
  description: string;
}

export type PaymentStep = 
  | 'select_plan'
  | 'input_phone'
  | 'stk_sent'
  | 'manual_code'
  | 'connected';

export interface ActiveSession {
  isConnected: boolean;
  ipAddress: string;
  macAddress: string;
  planName: string;
  timeRemainingSeconds: number;
  bytesDown: number;
  bytesUp: number;
  uptimeSeconds: number;
  expiresAt: string;
}
