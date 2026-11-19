// 雾汀塔罗 · 大阿卡纳 22 张
// 画风：雾岛之主克苏鲁秘卷（墨线 + 淡彩、旧纸、雾夜蓝灰、琥珀灯光唯一强调色）
// 世界观：雾港印的《雾汀塔罗》，夜间收件处用来给投不出去的信“问路”的牌。
// 每张牌对应一个人物或地点；204 封印出现在教皇和恶魔两张牌上。
// 倒吊人用倒影版（人站在水边，倒影颠倒）。
window.FogTarot = {
  cards: [
    { id: "fool", numeral: "0", name: "愚者", figure: "旅人提灯走进雾里，长耳小兽跟在脚边", keywords: "出发、无知、信任", meaning: "不知道前面是什么，但还是往前走。" },
    { id: "magician", numeral: "I", name: "魔术师", figure: "守塔人老周，灯、账本、钥匙、封蜡信都在桌上", keywords: "工具、专注、点灯", meaning: "手里有的东西，够把灯点亮。" },
    { id: "priestess", numeral: "II", name: "女祭司", figure: "收件处守夜人，面纱后是月亮，手里是封着的信", keywords: "沉默、直觉、未拆的信", meaning: "有些真相，现在还不能拆。" },
    { id: "empress", numeral: "III", name: "女皇", figure: "雾岛之主，众目之冠，雾之子提灯聚在脚边", keywords: "孕育、庇护、丰盛", meaning: "雾里的一切，都是她生的。" },
    { id: "emperor", numeral: "IV", name: "皇帝", figure: "商人老陈，油桶宝座，账本、封印、钥匙", keywords: "秩序、权柄、账本", meaning: "规矩是他定的，账也是他算的。" },
    { id: "hierophant", numeral: "V", name: "教皇", figure: "档案祭司，头顶发光的 204 封印，登记册摊开", keywords: "传统、契约、誓言", meaning: "有些规矩，写下来就是誓言。" },
    { id: "lovers", numeral: "VI", name: "恋人", figure: "白班林晚与夜班周野，背对背，只隔一张交班表", keywords: "相遇、选择、隔着一张表", meaning: "两个人之间，只隔一张交班表。" },
    { id: "chariot", numeral: "VII", name: "战车", figure: "船员阿海掌舵，两只雾兽拉船，灯塔的光在前方", keywords: "意志、前行、破雾", meaning: "雾再大，舵在自己手里。" },
    { id: "strength", numeral: "VIII", name: "力量", figure: "白衣研究员轻抚雾兽眉心，所有的眼睛都闭上了", keywords: "温柔、信任、驯服", meaning: "不用力气，也能让它安静下来。" },
    { id: "hermit", numeral: "IX", name: "隐者", figure: "背灯小兽，耳下夹着信，独自走在雾夜悬崖上", keywords: "独行、提灯、静默", meaning: "一个人走，灯就是同伴。" },
    { id: "wheel", numeral: "X", name: "命运之轮", figure: "船期之轮，轮心是一只琥珀色的眼睛", keywords: "周期、潮汐、轮转", meaning: "船期有周期，运气也是。" },
    { id: "justice", numeral: "XI", name: "正义", figure: "海关稽查顾衡，天平一边封蜡信，一边黄铜钥匙", keywords: "公正、权衡、证据", meaning: "信和钥匙，哪边重，哪边就是真相。" },
    { id: "hanged-man", numeral: "XII", name: "倒吊人", figure: "人站在水边低头看，水里的倒影是颠倒的世界", keywords: "换个角度、等待、倒影", meaning: "把世界倒过来看，答案就不一样。" },
    { id: "death", numeral: "XIII", name: "死神", figure: "苍白兜帽骑着雾兽，镰刀上挂着灯，脚印处开出白花", keywords: "结束、新生、寂然", meaning: "旧的熄了，新的才有地方亮。" },
    { id: "temperance", numeral: "XIV", name: "节制", figure: "守塔人倒琥珀灯油，满月壶往新月壶", keywords: "调和、分寸、慢慢倒", meaning: "不多不少，灯刚好亮一整夜。" },
    { id: "devil", numeral: "XV", name: "恶魔", figure: "角影商人，胸前 204 封印，金币链锁着守塔人和研究员", keywords: "契约、诱惑、锁链", meaning: "签了字的东西，会自己长出链子。" },
    { id: "tower", numeral: "XVI", name: "塔", figure: "灯塔被闪电劈中，灯室炸开，两个人影坠入雾里", keywords: "崩塌、真相、猝不及防", meaning: "塔倒了，光才照进来。" },
    { id: "star", numeral: "XVII", name: "星星", figure: "姑娘跪在潮汐池边倒发光的水，大星在灯塔上方", keywords: "希望、指引、倒水", meaning: "夜再长，星星还在倒水。" },
    { id: "moon", numeral: "XVIII", name: "月亮", figure: "满月半藏在雾后，灯塔与废塔夹着小路，雾兽望月", keywords: "幻象、直觉、雾", meaning: "雾里的路，要靠直觉走。" },
    { id: "sun", numeral: "XIX", name: "太阳", figure: "日出烧开雾气，孩子提着灯骑着雾兽", keywords: "黎明、明朗、孩子", meaning: "天亮了，雾就散了。" },
    { id: "judgement", numeral: "XX", name: "审判", figure: "号角手站在灯塔顶上，信化成白鸟飞走", keywords: "觉醒、召唤、信", meaning: "号角一响，封着的信自己飞起来。" },
    { id: "world", numeral: "XXI", name: "世界", figure: "雾岛之主坐在圆环中央，全地图在周围", keywords: "圆满、完整、回家", meaning: "雾汀、雾港、雾岛，都在这一个圆里。" }
  ]
};
