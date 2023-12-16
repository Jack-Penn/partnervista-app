import { createConnection, Connection, OkPacket } from "mysql2";
import { Address, NewPartner, Partner, Type, parseDataAsPartner, parseDataAsType } from "./types";

const connection: Connection = createConnection({
  host: "Mysql",
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
  const { name, description, website, typeIds, resources, contact_name, contact_email, contact_phone, address } =
    partner;

  const sql = `
    INSERT INTO partners
    (name, description, website, resources, contact_name, contact_email, contact_phone, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  try {
    const result: OkPacket = await query(sql, [
      name,
      description,
      website,
      resources,
      contact_name,
      contact_email,
      contact_phone,
    ]);
    typeIds.forEach((typeId) => {
      addPartnerType(result.insertId, typeId);
    });
    if (address) {
    }
    return result.insertId;
  } catch (error) {
    console.error("Error adding new partner:", error);
    throw error;
  }
};

export const addPartnerType = async (partnerId: string | number, typeId: string | number) => {
  const sql = `
    INSERT INTO partner_types
    (partner_id, type_id)
    VALUES (?, ?)
  `;

  try {
    const result: OkPacket = await query(sql, [partnerId, typeId]);
  } catch (error) {
    console.error("Error adding type to partner:", error);
    throw error;
  }
};

export const addPartnerAddress = async (partnerId: string | number, address: Address) => {
  const {
    street,
    city,
    state,
    zip_code,
    coordinates: { lat, lng },
  } = address;
  const sql = `
    INSERT INTO partner_addresses
    (partner_id, street, city, state, zip_code, POINT(?, ?))
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const result: OkPacket = await query(sql, [partnerId, street, city, state, zip_code, lat, lng]);
  } catch (error) {
    console.error("Error adding type to partner:", error);
    throw error;
  }
};

interface queryPartnersOptions {
  searchQuery?: string;
  typeId?: string;
  limit: number;
  offset: number;
}

export const queryPartners = async (options: queryPartnersOptions): Promise<Partner[]> => {
  options = Object.assign(
    {
      limit: 10,
      offset: 0,
    },
    options
  );

  let sql = `SELECT partners.* FROM partners\n`;

  const conditions: string[] = [];
  const params = [];

  if (options.searchQuery) {
    // sql += `\n     MATCH(partners.name) AGAINST (?) AS relevance`;
    conditions.push(`
      (
        -- Partial Match (case-insensitive)
        LOWER(partners.name) LIKE LOWER(?) 
        OR
        -- Full-Text Search with Score (case-insensitive)
        MATCH(partners.name) AGAINST (? IN BOOLEAN MODE)  
        OR
        -- Soundex Comparison (case-insensitive)
        SOUNDEX(LOWER(partners.name)) = SOUNDEX(LOWER(?))
      )`);
    params.push(`%${options.searchQuery}%`, options.searchQuery, options.searchQuery);
  }

  if (options.typeId) {
    sql += `
      JOIN partner_types pt ON partners.partner_id = pt.partner_id
      JOIN types c ON pt.type_id = c.type_id
    `;
    conditions.push(`pt.type_id = ?`);
    params.push(options.typeId);
  }

  if (conditions.length) {
    sql += `WHERE (${conditions.join(" AND ")})`;
  }

  sql += `
  ORDER BY partner_id DESC 
  LIMIT ? OFFSET ?`;
  params.push(options.limit, options.offset);

  try {
    const results: Partner[] = await query(sql, params);
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

export const getParnterById = async (id: string | number) => {
  try {
    const [partner] = await query("SELECT * FROM partners WHERE partner_id = ?", [id]);
    return parseDataAsPartner(partner);
  } catch (error) {
    console.error(`Error searching for partner ${id}:`, error);
    throw error;
  }
};

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

export const getAllTypes = async (): Promise<Type[]> => {
  const sql = `
    SELECT * FROM partnervista.types
    ORDER BY name;
  `;
  try {
    const result: Type[] = await query(sql);
    return result;
  } catch (error) {
    console.error("Error adding new partner:", error);
    throw error;
  }
};

export const getLocation = async (partnerId: number | string): Promise<Address | null> => {
  const sql = `
    SELECT * FROM your_table_name
    WHERE partner_id = ?;
  `;
  try {
    const result: Address = await query(sql, [partnerId]);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error adding new partner:", error);
    throw error;
  }
};
