export interface CreateFormProps {
  open: boolean;
  setOpen: any;
  refresh: () => void;
}
export interface DetailFormProps {
  open: boolean;
  setOpen: any;
  refresh: () => void;
  id: number;
  title?: string;
}
