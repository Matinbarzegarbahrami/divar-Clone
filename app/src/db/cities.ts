import { db } from './db';
import { cities } from './schema';
import 'dotenv/config';
async function seed() {
    await db.insert(cities).values([
        { slug: 'tehran', name: 'تهران' },
        { slug: 'tabriz', name: 'تبریز' },
    ]);

     ('seed done');
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});