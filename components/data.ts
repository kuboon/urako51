const subjects = [
  "浦和高校同窓会",
  "第51回生",
  "1999年卒",
];
export default {
  title: `${subjects[0]} ${subjects[1]} (${subjects[2]})`,
  subjects,
  description:
    "浦和高校同窓会 第51回生 (1999年卒)の公式サイトです。2025年秋頃に開催予定の同窓会に関する情報をお届けします。",
  photos: [
    { alt: "長屋", src: "nagaya.jpg" },
    { alt: "正門", src: "seimon.jpg" },
    { alt: "五重塔", src: "gojunoto.jpg" },
  ],
  messages: [
    {
      icon: "mikami.png",
      date: "2025-04-08",
      text: `【同窓会日時確定しました】
卒業25周年記念同窓会を下記の通り開催します。会場予約済み。詳細や出欠確認は開催日が近づいたら改めてご連絡します。まずはスケジュール確保と、連絡先がわかる同級生へ情報展開をお願いします！
【日時】2025年11月23日(日) 17:00-19:30
【場所】ホテルブリランテ武蔵野（さいたま市中央区新都心2-2）`,
    },
    {
      icon: "mikami.png",
      date: "2025-02-19",
      text:
        `卒業25周年同窓会を、今年秋頃に開催する予定で有志メンバーで準備を始めました（もう26年目になってるとか気にしない）。場所はさいたま市内を想定しています。詳細が固まってきたらこちらのグループで共有します。皆さんの連絡取れる同級生がいらっしゃいましたら、「秋頃集まるらしいぜ」など声掛けをしておいていただければ幸いです。`,
    },
  ],
  links: {
    line: {
      title: "浦和高校99/3月卒業生🎓",
      href: "https://line.me/ti/g2/REPnbomAxdhfC-5D5BeIK31B-yWN7EndoDxlIg",
    },
    facebook: {
      title: "浦和高校99/3月卒業生",
      href: "https://www.facebook.com/groups/urako51",
    },
  },
};
