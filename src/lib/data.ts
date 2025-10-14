import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const avatarImages = PlaceHolderImages.filter(img => img.id.startsWith('avatar'));

export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar: ImagePlaceholder;
}

export interface Patient extends User {
  role: 'PATIENT';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  medicalHistory: string;
}

export interface Doctor extends User {
  role: 'DOCTOR';
  specialization: string;
  department: string;
}

export interface Admin extends User {
  role: 'ADMIN';
}

export type QueueStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';

export interface QueueItem {
  id: string;
  patientId: string;
  doctorId: string;
  tokenNumber: number;
  status: QueueStatus;
  estimatedWaitTime: number; // in minutes
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  doctorId: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  isAnonymized: boolean;
  image?: ImagePlaceholder;
}

const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@mediqueue.pro', role: 'ADMIN', phone: '123-456-7890', avatar: avatarImages[0] },
  { id: 'user-2', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7891', avatar: avatarImages[1] },
  { id: 'user-3', name: 'John Doe', email: 'john.doe@mediqueue.pro', role: 'PATIENT', phone: '123-456-7892', avatar: avatarImages[2] },
  { id: 'user-4', name: 'Dr. Samuel Green', email: 'samuel.green@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7893', avatar: avatarImages[3] },
  { id: 'user-5', name: 'Jane Smith', email: 'jane.smith@mediqueue.pro', role: 'PATIENT', phone: '123-456-7894', avatar: avatarImages[4] },
  { id: 'user-6', name: 'Emily White', email: 'emily.white@mediqueue.pro', role: 'PATIENT', phone: '123-456-7895', avatar: avatarImages[0] },
  { id: 'user-7', name: 'Michael Brown', email: 'michael.brown@mediqueue.pro', role: 'PATIENT', phone: '123-456-7896', avatar: avatarImages[1] },
];

export const doctors: Doctor[] = [
  { id: 'doc-1', userId: 'user-2', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7891', avatar: avatarImages[1], specialization: 'Cardiology', department: 'Cardiology' },
  { id: 'doc-2', userId: 'user-4', name: 'Dr. Samuel Green', email: 'samuel.green@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7893', avatar: avatarImages[3], specialization: 'Neurology', department: 'Neurology' },
];

export const patients: Patient[] = [
  { id: 'pat-1', userId: 'user-3', name: 'John Doe', email: 'john.doe@mediqueue.pro', role: 'PATIENT', phone: '123-456-7892', avatar: avatarImages[2], age: 45, gender: 'Male', medicalHistory: 'Hypertension' },
  { id: 'pat-2', userId: 'user-5', name: 'Jane Smith', email: 'jane.smith@mediqueue.pro', role: 'PATIENT', phone: '123-456-7894', avatar: avatarImages[4], age: 34, gender: 'Female', medicalHistory: 'Asthma' },
  { id: 'pat-3', userId: 'user-6', name: 'Emily White', email: 'emily.white@mediqueue.pro', role: 'PATIENT', phone: '123-456-7895', avatar: avatarImages[0], age: 28, gender: 'Female', medicalHistory: 'None' },
  { id: 'pat-4', userId: 'user-7', name: 'Michael Brown', email: 'michael.brown@mediqueue.pro', role: 'PATIENT', phone: '123-456-7896', avatar: avatarImages[1], age: 52, gender: 'Male', medicalHistory: 'Diabetes Type 2' },
];

export const queues: QueueItem[] = [
  { id: 'q-1', patientId: 'pat-1', doctorId: 'doc-1', tokenNumber: 101, status: 'IN_PROGRESS', estimatedWaitTime: 0, createdAt: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 'q-2', patientId: 'pat-2', doctorId: 'doc-1', tokenNumber: 102, status: 'WAITING', estimatedWaitTime: 15, createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 'q-3', patientId: 'pat-3', doctorId: 'doc-1', tokenNumber: 103, status: 'WAITING', estimatedWaitTime: 25, createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'q-4', patientId: 'pat-4', doctorId: 'doc-2', tokenNumber: 201, status: 'COMPLETED', estimatedWaitTime: 0, createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    doctorId: 'doc-1',
    title: 'Atypical Presentation of Myocardial Infarction',
    description: 'A case study on a 55-year-old male presenting with atypical symptoms of a heart attack, highlighting the importance of broad differential diagnosis.',
    category: 'Cardiology',
    createdAt: '2023-10-26T10:00:00Z',
    isAnonymized: true,
    image: PlaceHolderImages.find(img => img.id === 'case-study-1'),
  },
  {
    id: 'cs-2',
    doctorId: 'doc-2',
    title: 'Early Onset of Parkinson\'s Disease',
    description: 'Detailed analysis of a 38-year-old patient diagnosed with early-onset Parkinson\'s disease, focusing on genetic markers and treatment response.',
    category: 'Neurology',
    createdAt: '2023-11-15T14:30:00Z',
    isAnonymized: true,
    image: PlaceHolderImages.find(img => img.id === 'case-study-2'),
  },
  {
    id: 'cs-3',
    doctorId: 'doc-1',
    title: 'Management of Chronic Heart Failure with Comorbidities',
    description: 'Comprehensive review of a long-term management plan for a 72-year-old patient with chronic heart failure, diabetes, and renal insufficiency.',
    category: 'Cardiology',
    createdAt: '2024-01-20T09:00:00Z',
    isAnonymized: true,
    image: PlaceHolderImages.find(img => img.id === 'case-study-3'),
  },
];

export const notifications = [
  { id: 'notif-1', message: 'Your appointment with Dr. Reed is next. Please proceed to Room 12.', time: '2m ago' },
  { id: 'notif-2', message: 'Dr. Green is running 15 minutes late. We apologize for the delay.', time: '30m ago' },
  { id: 'notif-3', message: 'Your prescription has been updated.', time: '1h ago' },
];

export function getPatientById(id: string) {
  return patients.find(p => p.id === id);
}

export function getDoctorById(id: string) {
  return doctors.find(d => d.id === id);
}
