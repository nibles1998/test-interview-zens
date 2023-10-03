# TEST-INTERVIEW-ZENS

## BACKEND

### Environment

Add file `.env` with template from file `.env.example`

- `PORT`: App running on port
- `MONGODB_URL`: Url connect MongoDB
- `SECRET_KEY`: Self-entered key, because the APP does not have authentication, so use this key to check in the story template creation section

### API

Create Fun Stories:

- Endpoint: `/fun-stories`
- Method: `POST`
- Body:

```JSON
{
    "title": "Title",
    "content": "Content",
    "secret_key": "SecretKey in file env"
}
```

Get Fun Stories:

- Endpoint: `/fun-stories`
- Method: `GET`

Vote Fun Stories:

- Endpoint: `/fun-stories/vote`
- Method: `POST`
- Body:

```JSON
{
    "_id": "id of Fun Stories",
    "has_fun": true
}
```

## ALGORITHM

### Main Function

```javascript
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
```

### Support Function

```javascript
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
```

- Function `add` sum 2 number

```javascript
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
```

- Function `findMinAndMax` find `min` and `max` value in array

### Other Function

- Support generate random numbers for testing

```javascript
const randInt = (a, b) => ~~(Math.random() * (b - a + 1)) + a;
```

- Function `randInt` randomly choose a number from the range `a - b`

```javascript
const genNumber = (len) => {
  let res = "";

  for (let i = 0; i < len; i++) {
    res += randInt(0, 9);
  }

  return res;
};
```

- Function `genNumber` generate numbers of arbitrary length
