export enum AlertPosition {
  Top = "top",
  TopRight = "top-right",
  TopLeft = "top-left",
  Bottom = "Bottom",
  BottomRight = "Bottom-right",
  BottomLeft = "Bottom-left",
}
export enum AlertVariant {
  Success = "success",
  Danger = "danger",
}
export interface AlertOptions {
  isOpen: boolean;
  interval: number;
  message: string;
  position: AlertPosition;
  variant: AlertVariant;
}
