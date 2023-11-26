export interface Partner {
  partner_id: number;
  name: string;
  description: string;
  website: string;
  types: Type[];
  resources: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  created_at: Date;
  updated_at: Date;
}

export function parseDataAsPartner(partner: Partner) {
  partner.created_at = new Date(partner.created_at);
  partner.updated_at = new Date(partner.updated_at);
  return partner;
}

export interface Type {
  type_id: number;
  name: string;
  color: string;
}

export function parseDataAsType(type: Type) {
  type.color = `#${type.color}`;
  return type;
}

export interface NewPartner {
  name: string;
  type: string;
  resources: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
}
