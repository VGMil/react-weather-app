export interface NavItem {
  id: number | string;
  name: string;
  ref: string;
  isActive?: boolean; // Opcional, para estado activo
  icon?: React.ReactNode; // Opcional, si quieres añadir iconos
}

export type NavItems = NavItem[];
