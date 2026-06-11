import {
    pgTable,
    serial,
    varchar,
    timestamp,
    numeric,
} from 'drizzle-orm/pg-core';

export const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 50 })
        .notNull()
        .unique(),
    name: varchar('name', { length: 100 })
        .notNull(),
    createdAt: timestamp('created_at')
        .defaultNow()
        .notNull(),
});

export const users = pgTable('user', {
    id: serial('id').primaryKey(),
    phone: varchar('phone', {length:11}).notNull().unique(),
    logincode: varchar('logincode').unique()
})