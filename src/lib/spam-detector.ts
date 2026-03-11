interface SpamCheckResult {
  isSpam: boolean;
  score: number;
  reasons: string[];
}

const SPAM_KEYWORDS = [
  "casino",
  "viagra",
  "lottery",
  "bitcoin",
  "crypto",
  "investment",
  "earn money",
  "click here",
  "free money",
  "winner",
  "prize",
  "赌博",
  "彩票",
  "代开发票",
  "刷单",
  "兼职",
  "日赚",
];

export function checkSpam(
  content: string,
  email: string,
  name: string
): SpamCheckResult {
  const reasons: string[] = [];
  let score = 0;

  const lowerContent = content.toLowerCase();

  // Rule 1: Excessive URLs
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) {
    score += 30;
    reasons.push("Too many URLs");
  }

  // Rule 2: Spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (lowerContent.includes(keyword.toLowerCase())) {
      score += 20;
      reasons.push(`Contains spam keyword: ${keyword}`);
    }
  }

  // Rule 3: All caps
  if (content.length > 10 && content === content.toUpperCase()) {
    score += 15;
    reasons.push("All caps content");
  }

  // Rule 4: Suspicious email patterns
  if (/^[a-z]{20,}@/.test(email)) {
    score += 15;
    reasons.push("Suspicious email pattern");
  }

  // Rule 5: Very short content with URL
  if (content.length < 20 && urlCount > 0) {
    score += 25;
    reasons.push("Short content with URL");
  }

  // Rule 6: Repeated characters
  if (/(.)\1{4,}/.test(content)) {
    score += 10;
    reasons.push("Excessive repeated characters");
  }

  // Rule 7: HTML injection attempt
  if (/<script|<iframe|javascript:/i.test(content)) {
    score += 50;
    reasons.push("Potential XSS attempt");
  }

  // Rule 8: Too many special characters
  const specialCharRatio =
    (content.replace(/[\w\s\u4e00-\u9fff]/g, "").length / content.length) *
    100;
  if (content.length > 5 && specialCharRatio > 50) {
    score += 15;
    reasons.push("Too many special characters");
  }

  return {
    isSpam: score >= 50,
    score,
    reasons,
  };
}
