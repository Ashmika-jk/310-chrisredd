/**
 * Data access helpers for category records.
 *
 * These helpers read category metadata from the local SQLite database during build time
 * so Astro pages can render static filter controls without a separate backend service.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

/**
 * Returns every category in alphabetical order by name.
 *
 * @param db - Injected database connection used to query the categories table.
 * @returns A promise that resolves to all categories sorted by name.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
