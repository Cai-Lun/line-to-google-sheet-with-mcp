import { Pool } from "pg"

let pgInstance: Pg | null = null

export class Pg {
	public client: Pool;

	constructor(client: Pool) {
		this.client = client;
	}

	static async init() {
		if (pgInstance) return pgInstance

		const client = new Pool({
			user: process.env.NEXT_SUPABASE_DB_USER,
			password: process.env.NEXT_SUPABASE_DB_PASSWORD,
			host: process.env.NEXT_SUPABASE_DB_HOST,
			port: 6543,
			database: "postgres",
      max: 5,		
		})
		
		
		pgInstance = new Pg(client)
		// await client.connect();
		return pgInstance
	}
}
