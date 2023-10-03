const randInt = (a, b) => ~~(Math.random() * (b - a + 1)) + a;

const genNumber = (len) => {
  let res = "";

  for (let i = 0; i < len; i++) {
    res += randInt(0, 9);
  }

  return res;
};

const add = (a, b) => {
  let res = "";
  let c = 0;

  a = a.split("");
  b = b.split("");

  while (a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop();
    res = (c % 10) + res;
    c = c > 9;
  }

  return res;
};

const findMinAndMax = (arr) => {
  return arr.reduce(
    ([min, max], x) => {
      return [
        x.length < min.length
          ? x
          : x.length > min.length
          ? min
          : x < min
          ? x
          : min,
        x.length > max.length
          ? x
          : x.length < max.length
          ? max
          : x > max
          ? x
          : max,
      ];
    },
    [arr[0], arr[0]]
  );
};

const miniMaxSum = (arr) => {
  let min = 0;
  let max = 0;

  if (!Array.isArray(arr) || arr.length === 0) {
    return `${min} ${max}`;
  }

  arr = arr.map((x) => (x ? `${x}`.replace(/^0*/, "") : "0"));

  const total = [];

  for (let i = 0; i < arr.length; i++) {
    const temp = [...arr];
    temp.splice(i, 1);
    total.push(temp.reduce((s, x) => add(s, x), "0"));
  }

  [min, max] = findMinAndMax(total);

  return `${min} ${max}`;
};

const dataTest = [
  null,
  undefined,
  [],
  1,
  "1",
  [1, 4, 6, 3, 8],
  [5, 2, 0, 5, 3],
  [1, 2, 3, 4, 5],
  [null, 4, 6, 4, 3],
  [4, undefined, 6, 4, 3],
  ["098", "214", "3", "23", "0000034"],
  ["098", 214, undefined, null, "0000034"],
  [
    genNumber(randInt(5, 20)),
    genNumber(randInt(5, 20)),
    genNumber(randInt(5, 20)),
    genNumber(randInt(5, 20)),
    genNumber(randInt(5, 20)),
  ],
  [
    randInt(0, 1) ? genNumber(randInt(5, 20)) : null,
    randInt(0, 1) ? genNumber(randInt(5, 20)) : undefined,
    randInt(0, 1) ? genNumber(randInt(5, 20)) : null,
    randInt(0, 1) ? genNumber(randInt(5, 20)) : undefined,
    randInt(0, 1) ? genNumber(randInt(5, 20)) : null,
  ],
];

for (const item of dataTest) {
  console.log(miniMaxSum(item));
}
