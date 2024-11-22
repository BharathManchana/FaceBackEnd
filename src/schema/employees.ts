import { pgTable, varchar, text, date, time, integer, timestamp, serial } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const employees = pgTable('employees', {
    id: integer('id').notNull().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    section: varchar('section', { length: 255 }).notNull(),
    date: date('date').notNull(),
    timeIn: time('time_in').notNull(),
    profileImageUrl: text('profile_image'),
  });


  export const employeeImages = pgTable('employeeImages', {
    id: serial('id').primaryKey(),
    empId: integer('empId').references(() => employees.id),
    empImagesUrl: text('user_image'),
    uploadedAt: timestamp('uploaded_at').defaultNow(),
  });
  
  export const addEmployeeSchema = z.object({
    body: z.object({
      id: z.string().transform((val) => parseInt(val)).refine((val) => !isNaN(val), { message: 'Invalid ID' }),
      name: z.string().max(255),
      section: z.string().max(255),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
      time_in: z.string().regex(/^\d{2}:\d{2}:\d{2}$/), // HH:MM:SS
      profile_image: z.string().optional(),
    }),
  });
  