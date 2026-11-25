// Helper demonstrasi: ubah payload JWT tanpa mengubah signature.
// Cara pakai: node scripts/tamper-token.js "JWT_ASLI"
const token = process.argv[2];
if (!token) {
  console.error('Pemakaian: node scripts/tamper-token.js "JWT_ASLI"');
  process.exit(1);
}
const parts = token.split(".");
if (parts.length !== 3) {
  console.error("Token bukan format JWT 3 bagian.");
  process.exit(1);
}
const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
payload.id = 999999;
const alteredPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
console.log(`${parts[0]}.${alteredPayload}.${parts[2]}`);
