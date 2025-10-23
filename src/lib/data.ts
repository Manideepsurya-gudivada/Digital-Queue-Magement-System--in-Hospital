import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const avatarImages = PlaceHolderImages.filter(img => img.id.startsWith('avatar'));

export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'RECEPTIONIST';

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
  userId?: string; // Link to the UserProfile ID
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  medicalHistory: string;
}

export interface Doctor extends User {
  role: 'DOCTOR';
  specialization: string;
  department: string;
}

export interface Receptionist extends User {
  role: 'RECEPTIONIST';
}

export interface Admin extends User {
  role: 'ADMIN';
}

export type QueueStatus = 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';

export interface QueueItem {
  id: string;
  patientId: string;
  doctorId: string;
  tokenNumber: string;
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

export interface DepartmentMetric {
  id: string;
  name: string;
  patientLoad: number;
  avgWaitTime: number; // in minutes
  doctorCount: number;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@mediqueue.pro', role: 'ADMIN', phone: '123-456-7890', avatar: avatarImages[0] },
  { id: 'user-2', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7891', avatar: avatarImages[1] },
  { id: 'user-3', name: 'John Doe', email: 'john.doe@mediqueue.pro', role: 'PATIENT', phone: '123-456-7892', avatar: avatarImages[2] },
  { id: 'user-4', name: 'Dr. Samuel Green', email: 'samuel.green@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7893', avatar: avatarImages[3] },
  { id: 'user-5', name: 'Jane Smith', email: 'jane.smith@mediqueue.pro', role: 'PATIENT', phone: '123-456-7894', avatar: avatarImages[4] },
  { id: 'user-6', name: 'Emily White', email: 'emily.white@mediqueue.pro', role: 'PATIENT', phone: '123-456-7895', avatar: avatarImages[0] },
  { id: 'user-7', name: 'Robert Brown', email: 'michael.brown@mediqueue.pro', role: 'PATIENT', phone: '123-456-7896', avatar: avatarImages[1] },
  { id: 'user-8', name: 'Receptionist User', email: 'reception@mediqueue.pro', role: 'RECEPTIONIST', phone: '123-456-7897', avatar: avatarImages[2] },
  { id: 'user-9', name: 'Dr. Alan Turing', email: 'alan.turing@mediqueue.pro', role: 'DOCTOR', phone: '123-456-1111', avatar: avatarImages[4] },
  { id: 'user-10', name: 'Alice Johnson', email: 'alice.j@mediqueue.pro', role: 'PATIENT', phone: '111-222-3333', avatar: avatarImages[0] },
  { id: 'user-11', name: 'Dr. Grace Hopper', email: 'grace.hopper@mediqueue.pro', role: 'DOCTOR', phone: '123-456-2222', avatar: avatarImages[1] },
];

export const doctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7891', avatar: avatarImages[1], specialization: 'Cardiology', department: 'Cardiology' },
  { id: 'doc-2', name: 'Dr. Samuel Green', email: 'samuel.green@mediqueue.pro', role: 'DOCTOR', phone: '123-456-7893', avatar: avatarImages[3], specialization: 'Neurology', department: 'Neurology' },
  { id: 'doc-3', name: 'Dr. Alan Turing', email: 'alan.turing@mediqueue.pro', role: 'DOCTOR', phone: '123-456-1111', avatar: avatarImages[4], specialization: 'Pediatrics', department: 'Pediatrics' },
  { id: 'doc-4', name: 'Dr. Grace Hopper', email: 'grace.hopper@mediqueue.pro', role: 'DOCTOR', phone: '123-456-2222', avatar: avatarImages[1], specialization: 'ENT', department: 'ENT' },
];

export const patients: Patient[] = [
  { id: 'pat-1', name: 'John Doe', email: 'john.doe@mediqueue.pro', role: 'PATIENT', phone: '123-456-7892', avatar: avatarImages[2], age: 45, gender: 'Male', medicalHistory: 'Hypertension' },
  { id: 'pat-2', name: 'Jane Smith', email: 'jane.smith@mediqueue.pro', role: 'PATIENT', phone: '123-456-7894', avatar: avatarImages[4], age: 34, gender: 'Female', medicalHistory: 'Asthma' },
  { id: 'pat-3', name: 'Emily White', email: 'emily.white@mediqueue.pro', role: 'PATIENT', phone: '123-456-7895', avatar: avatarImages[0], age: 28, gender: 'Female', medicalHistory: 'None' },
  { id: 'pat-4', name: 'Robert Brown', email: 'michael.brown@mediqueue.pro', role: 'PATIENT', phone: '123-456-7896', avatar: avatarImages[1], age: 52, gender: 'Male', medicalHistory: 'Diabetes Type 2' },
  { id: 'pat-5', name: 'Alice Johnson', email: 'alice.j@mediqueue.pro', role: 'PATIENT', phone: '111-222-3333', avatar: avatarImages[0], age: 29, gender: 'Female', medicalHistory: 'None' },
];

export const queues: QueueItem[] = [
  // C-001 for John Doe, Cardiology (Dr. Reed)
  { id: 'q-1', patientId: 'pat-1', doctorId: 'doc-1', tokenNumber: 'C-001', status: 'WAITING', estimatedWaitTime: 0, createdAt: new Date(Date.now() - 27 * 60 * 1000).toISOString() },
  // E-001 for Jane Smith, ENT (Dr. Hopper)
  { id: 'q-2', patientId: 'pat-2', doctorId: 'doc-4', tokenNumber: 'E-001', status: 'WAITING', estimatedWaitTime: 15, createdAt: new Date(Date.now() - 24 * 60 * 1000).toISOString() },
  // P-001 for Robert Brown, Pediatrics (Dr. Turing)
  { id: 'q-3', patientId: 'pat-4', doctorId: 'doc-3', tokenNumber: 'P-001', status: 'WAITING', estimatedWaitTime: 25, createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
  // C-002 for Alice Johnson, Cardiology (Dr. Reed)
  { id: 'q-4', patientId: 'pat-5', doctorId: 'doc-1', tokenNumber: 'C-002', status: 'WAITING', estimatedWaitTime: 0, createdAt: new Date(Date.now() - 17 * 60 * 1000).toISOString() },
  // Some other appointments for context
  { id: 'q-5', patientId: 'pat-3', doctorId: 'doc-2', tokenNumber: 'N-001', status: 'COMPLETED', estimatedWaitTime: 0, createdAt: new Date('2025-10-22T22:04:00Z').toISOString() },
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

export const departmentMetrics: DepartmentMetric[] = [
    { id: 'dept-1', name: 'Cardiology', patientLoad: 35, avgWaitTime: 22, doctorCount: 2 },
    { id: 'dept-2', name: 'Neurology', patientLoad: 28, avgWaitTime: 18, doctorCount: 1 },
    { id: 'dept-3', name: 'Orthopedics', patientLoad: 42, avgWaitTime: 35, doctorCount: 3 },
    { id: 'dept-4', name: 'Pediatrics', patientLoad: 55, avgWaitTime: 15, doctorCount: 4 },
];
  
export const recentActivities: Activity[] = [
    { id: 'act-1', description: 'New patient John Smith registered for Cardiology.', timestamp: '5m ago' },
    { id: 'act-2', description: 'Dr. Reed completed consultation with patient #101.', timestamp: '12m ago' },
    { id: 'act-3', description: 'AI detected a high patient influx for Pediatrics.', timestamp: '25m ago' },
    { id: 'act-4', description: 'A new case study on "Atypical Myocardial Infarction" was published.', timestamp: '45m ago' },
];

export function getPatientById(id: string): Patient | undefined {
  return patients.find(p => p.id === id) as Patient | undefined;
}

export function getDoctorById(id: string) {
  return doctors.find(d => d.id === id);
}
