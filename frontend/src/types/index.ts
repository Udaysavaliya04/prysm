export interface Password {
  _id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PasswordFormData {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

export interface MasterKeyInputProps {
  onMasterKeySet: (masterKey: string) => void;
}

export interface PasswordListProps {
  passwords: Password[];
  onEdit: (password: Password) => void;
  onDelete: (id: string) => void;
  masterKey: string;
}

interface BasePasswordFormProps {
  passwords: Password[];
  onClose: () => void;
}

interface AddPasswordFormProps extends BasePasswordFormProps {
  password: null;
  onSubmit: (data: PasswordFormData) => Promise<void>;
}

interface EditPasswordFormProps extends BasePasswordFormProps {
  password: Password;
  onSubmit: (id: string, data: PasswordFormData) => Promise<void>;
}

export type PasswordFormProps = AddPasswordFormProps | EditPasswordFormProps; 