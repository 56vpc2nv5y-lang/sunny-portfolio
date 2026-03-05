// 文件路径: /api/visit.js
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto'; 

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  // 1. 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  // 2. 告诉浏览器不要缓存
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { ref = '', path = '/' } = req.query;
    
    // 生成随机指纹
    const randomHash = crypto.randomBytes(16).toString('hex');

    const country = req.headers['x-vercel-ip-country'] || 'Unknown';
    const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : 'Unknown';
    
    // 调用数据库函数
    const { data, error } = await supabase.rpc('record_visit', {
      user_hash: randomHash, 
      user_country: country,
      user_city: city,
      page_path: path,
      user_isp: 'Unknown',
      user_org: 'Unknown',
      user_referrer: ref 
    });

    if (error) throw error;

    return res.status(200).json({ 
      // 👇 就是这里！修复了读取数字的 Bug 👇
      total_visits: data || 0, 
      message: 'Visit recorded (+1)'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
