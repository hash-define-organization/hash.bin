import { faSave, faCheck, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";



export interface Bin
{
  language: string;
  customUrl: string;
  code: string;
  expiryDate: string;
}
export enum SaveStates
{
  neutral = "neutral",
  failure = "failure",
  success = "success"
}
export const SaveIcons = {
  saveNeutralIcon: faSave,
  saveSuccessIcon: faCheck,
  saveFailureIcon: faExclamationCircle,
};
