import { BigQuery } from '@google-cloud/bigquery';
import fs from 'fs';
import path from 'path';

let keyFilename;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  // Sur Vercel, écrire le credentials dans /tmp
  const credsPath = '/tmp/gcp-creds.json';
  if (!fs.existsSync(credsPath)) {
    fs.writeFileSync(credsPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  }
  keyFilename = credsPath;
} else {
  // Fallback local/dev
  keyFilename = path.join(__dirname, '../credentials.json');
}

const bigquery = new BigQuery({ keyFilename });

/**
 * Exécute une requête SQL sur BigQuery
 * @param {string} query - La requête SQL à exécuter
 * @returns {Promise<Array>} - Les résultats de la requête
 */
export async function runQuery(query) {
  const [rows] = await bigquery.query({ query });
  return rows;
}

module.exports = { runQuery }; 