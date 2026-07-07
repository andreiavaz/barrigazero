export interface DailyMissionState {
  completedTasks: { [dayNum: number]: { [taskIndex: number]: boolean } };
  notes: { [dayNum: number]: { [key: string]: string } };
}

export interface MeasurementsState {
  day1: {
    peso: string;
    cintura: string;
    quadril: string;
  };
  day15: {
    peso: string;
    cintura: string;
    quadril: string;
  };
  conquistas: string;
  photoBefore: string | null;
  photoAfter: string | null;
}

export interface WaterLog {
  target: number;
  consumed: number;
  logs: { id: string; time: string; amount: number }[];
}

export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'card';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export type AppView = 'landing' | 'checkout' | 'welcome' | 'app';
export type AppTab = 'map' | 'missions' | 'food' | 'sabotage' | 'metrics' | 'certificate';
