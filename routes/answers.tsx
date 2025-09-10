// get csv from https://docs.google.com/spreadsheets/d/e/2PACX-1vTWdM66aZTadq8LqSAVZsmR3zMmYbU1H9yackTS64Gqy88h0ZwPy5RHwfWxCENIMcsJyxY3c3Crm1mu/pub?gid=1491927313&single=true&output=csv
// parse it and generate json
// csv first line is header like this
// タイムスタンプ,メールアドレス,参加表明,氏名,活動地域,近況,電話番号,運営メンバーへ,学生注目
// then pick only these columns
// 参加表明,氏名,活動地域,近況
// and convert to json array.

import { Handlers } from "$fresh/server.ts";

type Row = {
  attendance: string;
  name: string;
  location: string;
  update: string;
};

type Props = {
  rows: Row[];
};

const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWdM66aZTadq8LqSAVZsmR3zMmYbU1H9yackTS64Gqy88h0ZwPy5RHwfWxCENIMcsJyxY3c3Crm1mu/pub?gid=1491927313&single=true&output=csv";

const cache = await caches.open("answers-csv-cache");
async function cachedFetch(url: string): Promise<Response> {
  const cached = await cache.match(url);
  if (cached) {
    const dateHeader = cached.headers.get("date");
    if (dateHeader) {
      const cachedTime = new Date(dateHeader).valueOf();
      const now = Date.now();
      if (!isNaN(cachedTime) && now - cachedTime < 10 * 60 * 1000) {
        return cached;
      }
    }
  }
  const res = await fetch(url);
  await cache.put(url, res.clone());
  return res;
}

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const res = await cachedFetch(csvUrl);
    const csvText = await res.text();
    const parsed = parseCSV(csvText!).filter((row) => row.length > 1);
    const header = parsed[0];
    const rows = parsed.slice(1).map((values) => {
      const row: Record<string, string> = {};
      header.forEach((key, index) => {
        row[key] = values[index];
      });
      return row;
    });
    const filtered = rows.map((row) => ({
      attendance: row["参加表明"],
      name: row["氏名"],
      location: row["活動地域"],
      update: row["近況"],
    })).sort((a, b) => {
      const ATTEND_YES = "参加します";
      if (a.attendance === ATTEND_YES && b.attendance !== ATTEND_YES) return -1;
      if (a.attendance !== ATTEND_YES && b.attendance === ATTEND_YES) return 1;
      return a.attendance.localeCompare(b.attendance);
    });
    return ctx.render({ rows: filtered });
  },
};

// CSV parser that handles newlines inside quoted fields
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(cell);
        cell = "";
      } else if (char === "\n" || char === "\r") {
        // Handle \r\n or \n as row end
        if (char === "\r" && text[i + 1] === "\n") i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
    i++;
  }
  // Add last cell/row if not empty
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export default function AnswersPage({ data }: { data: Props }) {
  return (
    <div>
      <h1 class="text-xl m-4">回答一覧</h1>
      <div class="answers m-4">
        {data.rows.map((row, index) => (
          <div key={index} class="flex flex-wrap gap-4 border-t even:bg-base-200">
            <div class="font-bold">{row.name}</div>
            <div>{row.attendance}</div>
            <div>{row.location}</div>
            <div>{row.update}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
