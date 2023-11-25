import { createConnection, Connection, OkPacket } from "mysql";
import { NewPartner, Partner, Type, parseDataAsPartner, parseDataAsType } from "./types";

const connection: Connection = createConnection({
  host: "localhost",
  user: "root",
  database: "partnervista",
  password: "password",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

export default connection;

export const query = (sql: string, arr: (string | number)[] = []): Promise<any> =>
  new Promise((resolve, reject) => {
    connection.query(sql, arr, (err, results: OkPacket) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

export const addNewPartner = async (partner: NewPartner): Promise<number> => {
  const { name, type, resources, contact_name, contact_email, contact_phone } = partner;

  const sql = `
    INSERT INTO partners
    (name, type, resources, contact_name, contact_email, contact_phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  try {
    const result: OkPacket = await query(sql, [name, type, resources, contact_name, contact_email, contact_phone]);
    return result.insertId;
  } catch (error) {
    console.error("Error adding new partner:", error);
    throw error;
  }
};

export const getPartners = async (limit: number, offset: number = 0): Promise<Partner[]> => {
  const sql = `
    SELECT *
    FROM partners
    ORDER BY partner_id DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const results: Partner[] = await query(sql, [limit, offset]);
    const partners = await Promise.all(
      results.map(async (partner: Partner) => {
        partner.types = await getPartnerTypes(partner);
        return parseDataAsPartner(partner);
      })
    );
    return partners;
  } catch (error) {
    console.error("Error retrieving partners:", error);
    throw error;
  }
};

export const searchPartners = async (searchQuery: string, limit: number, offset: number = 0): Promise<Partner[]> => {
  const sql = `
    SELECT *,
        MATCH(name) AGAINST (?) AS relevance
    FROM partners
    WHERE 
        (
            -- Partial Match (case-insensitive)
            LOWER(name) LIKE LOWER(?)
            OR

            -- Full-Text Search with Score (case-insensitive)
            MATCH(name) AGAINST (? IN BOOLEAN MODE)
        )
        OR

        -- Soundex Comparison (case-insensitive)
        SOUNDEX(LOWER(name)) = SOUNDEX(LOWER(?))
    ORDER BY relevance DESC
    LIMIT ? OFFSET ?
  `;
  try {
    const results: Partner[] = await query(sql, [
      `%${searchQuery}%`,
      `%${searchQuery}%`,
      searchQuery,
      searchQuery,
      limit,
      offset,
    ]);
    const partners = await Promise.all(
      results.map(async (partner: Partner) => {
        partner.types = await getPartnerTypes(partner);
        return parseDataAsPartner(partner);
      })
    );
    return partners;
  } catch (error) {
    console.error("Error searching partners:", error);
    throw error;
  }
};

interface queryPartnersOptions {
  searchQuery?: string;
  typeId?: string;
  limit: number;
  offset: number;
}


async function getPartnerTypes(partner: Partner): Promise<Type[]> {
  const sql = `
    SELECT t.*
    FROM partner_types pt
    JOIN types t ON pt.type_id = t.type_id
    WHERE pt.partner_id = ?;
  `;
  try {
    const results: Type[] = await query(sql, [partner.partner_id]);
    return results.map(parseDataAsType);
  } catch (error) {
    console.error("Error getting partner types:", error);
    throw error;
  }
}
