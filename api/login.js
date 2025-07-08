import bcrypt from 'bcryptjs';
import { runQuery } from '../backend/services/bigquery';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }
  try {
    const query = `
      SELECT id, email, password, prenom, role, is_active
      FROM \`${process.env.GOOGLE_CLOUD_PROJECT}.${process.env.BIGQUERY_DATASET}.users\`
      WHERE email = '${email}' AND is_active = true
      LIMIT 1
    `;
    const users = await runQuery(query);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Utilisateur non trouvé ou inactif.' });
    }
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Mot de passe invalide.' });
    }
    try {
      const updateQuery = `
        UPDATE \`${process.env.GOOGLE_CLOUD_PROJECT}.${process.env.BIGQUERY_DATASET}.users\`
        SET last_login = CURRENT_TIMESTAMP()
        WHERE email = '${email}'
      `;
      await runQuery(updateQuery);
    } catch (updateError) {
      console.warn('Erreur lors de la mise à jour du last_login:', updateError);
    }
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        role: user.role,
      },
      token: 'demo-token'
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
} 