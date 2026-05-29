import {
    pgTable,
    serial,
    varchar,
    timestamp,
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