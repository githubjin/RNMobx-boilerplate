/**
 * @flow
 */
export const carColor: CarColor[] = [
  { class: "silver-color", name: "银色", value: 0, color: "#C0C0C0" },
  { class: "black-color", name: "黑色", value: 1, color: "#000000" },
  { class: "white-color", name: "白色", value: 2, color: "#F5F5F5" },
  { class: "gray-color", name: "灰色", value: 3, color: "#808080" },
  { class: "red-color", name: "红色", value: 4, color: "#FF0000" },
  { class: "gold-color", name: "金色", value: 5, color: "#FFD700" },
  { class: "yellow-color", name: "黄色", value: 6, color: "#FFFF00" },
  { class: "green-color", name: "绿色", value: 7, color: "#008000" },
  { class: "purple-color", name: "紫色", value: 8, color: "#800080" },
  { class: "orange-color", name: "橙色", value: 9, color: "#FFA500" },
  { class: "brown-color", name: "棕色", value: 10, color: "#A52A2A" },
  { class: "beige-color", name: "米色", value: 11, color: "#F5F5DC" },
  { class: "chocolate-color", name: "巧克力色", value: 12, color: "#D2691E" },
  { class: "champagne-color", name: "香槟色", value: 13, color: "#FFFF99" }
];

function rangeChoices(option_list, start = 0) {
  return option_list.map(function(item, index) {
    return { name: item, value: index + start };
  });
}
function dictChoices(choices) {
  var t = {};
  choices.map(function(item) {
    t[item["value"]] = item["name"];
  });
  return t;
}

export const carType = [
  { name: "小型汽车", value: 2 },
  { name: "大型汽车", value: 1 }
].concat(
  rangeChoices(
    [
      "使馆汽车",
      "领馆汽车",
      "境外汽车",
      "外籍汽车",
      "两三轮摩托",
      "轻便摩托车",
      "使馆摩托车",
      "领馆摩托车",
      "境外摩托车",
      "外籍摩托车",
      "农用运输车",
      "拖拉机",
      "挂车",
      "教练汽车",
      "教练摩托车"
    ],
    (start = 3)
  ),
  [{ name: "香港入境车", value: 26 }, { name: "澳门入境车", value: 27 }]
);

export const shiftingType = rangeChoices(["手动", "自动"]);
export const driverType = rangeChoices(["两驱", "四驱"]);

export const autoReviewStatusDict = {
  0: { title: "已创建机审", color: "#F1C40F" },
  1: { title: "正在机审", color: "#659be0" },
  2: { title: "机审通过", color: "#36c6d3" },
  3: { title: "机审拒绝", color: "#ed6b75" }
};

export const phoneReviewStatusDict = {
  0: { title: "等待电核", color: "#F1C40F" },
  1: { title: "电核完成", color: "#36c6d3" }
};

export const borrowingStatusDict = {
  "0": { title: "待初审", color: "#F1C40F", stage: "初审", action: "shop_review" },
  "1": { title: "待主审", color: "#659be0", stage: "主审", action: "master_review" },
  "-1": { title: "初审拒绝", color: "#ed6b75" },
  "2": {
    title: "待财审",
    color: "primary",
    stage: "财审",
    action: "accountant_review"
  },
  "-2": { title: "主审拒绝", color: "#ed6b75" },
  "3": { title: "待复审", color: "#36c6d3", stage: "复审", action: "retrial" },
  "-3": { title: "财审拒绝", color: "#ed6b75" },
  "4": { title: "还款中", color: "#bac3d0" },
  "-4": { title: "复审拒绝", color: "#ed6b75" },
  "5": { title: "还款完成", color: "#bac3d0" },
  "-5": { title: "坏账", color: "#ed6b75" }
};
export const termUnit = dictChoices(rangeChoices(["天", "个月"]));
export const borrowingTypeDict = dictChoices(
  rangeChoices(["抵押借款", "质押借款", "库存融资"])
);

export type CarColorType = {
  class: string,
  name: string,
  value: number,
  color: string
};

export type CarType = {
  name: string,
  value: number
};
