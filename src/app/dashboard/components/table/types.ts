import type { Mapper } from "./operator";

export type ColumnTypes = {
  id: string;
  type: keyof typeof Mapper;
  extraInfo?: "numberRange" | "dateTimeRange" | "dateRange";
};

export interface Entity {
  id: string;
}

export interface Specialization extends Entity {
  englishName: string;
  arabicName: string;
  logo: string;
}

export interface User {
  phone: string;
  email: string;
  gender: "MALE" | "FEMALE";
  password: string;
  addresses: {
    street: string | undefined;
    city: string | undefined;
    country: string | undefined;
    postalCode: string | undefined;
  }[];
  bloodGroup: string;
  dateOfBirth: Date;
  user: {
    status: "ACTIVE" | "INACTIVE";
  };
  photo: string;
}

export interface Unit {
  unitNumber: number;
  unitBlock: string;
  unitArea: number;
  unitStatus: "sold" | "available";
  unitPhase: string;
  marketPrice: number;
  MOHPrice: number;
}

export interface Doctor extends Entity, User {
  firstName: string;
  lastName: string;
  arabicName: string;
  experience: number;
  linkedin: string;
  twitter: string;
  instagram: string;
  specializations: Specialization[];
}

export interface Staff extends Entity, User {
  firstName: string;
  lastName: string;
  arabicName: string;
}

export interface Services extends Entity {
  englishName: string;
  arabicName: string;
  price: number;
  doctor: Doctor;
  active: boolean;
}
export interface Medicine extends Entity {
  name: string;
}

export interface InsuranceCompany extends Entity {
  name: string;
  contactPerson: string;
  address: string;
  phone: string;
}

export interface InsurancePlan extends Entity {
  name: string;
  coverageLimit: number;
  discount: number;
  approvalRequired: boolean;
  coveredService: string;
  company: InsuranceCompany;
  coveredServiceIds: string;
}

export interface InsuranceClaim extends Entity {
  tenantId: string;
  Unit: Unit;
  company: InsuranceCompany;
  membershipId: string;
  treatmentDate: Date;
  appointment: Appointment;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COLLECTED";
  approvalRequired: boolean;
  amountApproved: number;
  amountCollected: number;
}

export type WeekDay =
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY";

export type Days = {
  day: WeekDay;
  available: boolean;
  from: string;
  to: string;
}[];

export type AppointmentRecordType =
  | "NOTES"
  | "VOICE_NOTES"
  | "DESCRIPTION"
  | "PROBLEMS"
  | "OBSERVATION"
  | "PRESCRIPTION";

export type MedicalRecord = {
  id: string;
  createdAt: string;
  type: AppointmentRecordType;
  content: string;
}[];

export interface Appointment extends Entity {
  doctor: Doctor;
  Unit: Unit;
  serviceType: Services;
  extraFees: number;
  paid: boolean;
  paymentMethod: string;
  discount: number;
  date: string;
  status: "BOOKED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED";
  description: string;
  timeSlot: string;
  patientId: string;
  CREATED_AT: Date;
  medicalRecords: MedicalRecord;
}
