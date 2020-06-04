---
title: 'From callbacks to promises and async/await'
date: '2020-06-01'
template: 'post'
draft: true
slug: 'from-callbacks-to-promises-and-async-await'
category: 'Coding'
tags:
  - 'Javascript fundamentals'
  - 'Interviewing'
description: ''
socialImage: ''
# published: false
cover_image: ''
# canonical_url: 'https://marekdano.com/blog/closure-in-javascript/'
---

```js
const errorHandler = () => {
  console.log('Oh no, error here.');
};

const printName = (name, callback, errorCallback) => {
  const time = Math.floor(Math.random() * 1000) + 1;

  if (time > 700) {
    errorCallback();
  } else {
    setTimeout(() => {
      console.log(name);
      callback();
    }, time);
  }
};

function printAllNames() {
  printName('John');
  printName('Emma');
  printName('Mary');
}

// printAllNames()

function printNamesWithCallback() {
  printName(
    'John',
    () => {
      printName(
        'Emma',
        () => {
          printName('Mary', () => {}, errorHandler);
        },
        errorHandler
      );
    },
    errorHandler
  );
}

// printAllNamesWithCallback()

const printNameWithPromise = (name) => {
  const time = Math.floor(Math.random() * 1000) + 1;

  return new Promise((resolve, reject) => {
    if (time > 700) {
      reject();
    } else {
      setTimeout(() => {
        console.log(name);
        resolve();
      }, time);
    }
  });
};

function printAllNamesWithPromise() {
  printNameWithPromise('John')
    .then(() => printNameWithPromise('Emma'))
    .then(() => printNameWithPromise('Mary'))
    .catch(() => console.log('Oh no, error here.'));
}

// printAllNamesWithPromise()

async function printAllNamesWithAsync() {
  try {
    await printNameWithPromise('John');
    await printNameWithPromise('Emma');
    await printNameWithPromise('Mary');
  } catch {
    errorHandler();
  }
  // await printNameWithPromise('John').catch(errorHandler)
  // await printNameWithPromise('Emma').catch(errorHandler)
  // await printNameWithPromise('Mary').catch(errorHandler)
}

// printAllNamesWithAsync()

const addName = (result, name, callback, errorCallback) => {
  const time = Math.floor(Math.random() * 1000) + 1;

  if (time > 800) {
    errorCallback();
  } else {
    setTimeout(() => {
      callback(`${result} ${name}`);
    }, time);
  }
};

function addAllNamesWithCallback() {
  addName(
    '',
    'John',
    (result) => {
      addName(
        result,
        'Emma',
        (result) => {
          addName(
            result,
            'Mary',
            (result) => {
              console.log(result);
            },
            errorHandler
          );
        },
        errorHandler
      );
    },
    errorHandler
  );
}

// addAllNamesWithCallback()

const addNameWithPromise = (result, name) => {
  const time = Math.floor(Math.random() * 1000) + 1;

  return new Promise((resolve, reject) => {
    if (time > 700) {
      reject();
    } else {
      setTimeout(() => {
        resolve(`${result} ${name}`);
      }, time);
    }
  });
};

function addAllNamesWithPromise() {
  addNameWithPromise('', 'John')
    .then((result) => printNameWithPromise(result, 'Emma'))
    .then((result) => printNameWithPromise(result, 'Mary'))
    .then((result) => console.log(result))
    .catch(errorHandler);
}

// addAllNamesWithPromise()

async function addAllNamesWithAsync() {
  let result = '';
  try {
    result = await addNameWithPromise('', 'John');
    result = await addNameWithPromise(result, 'Emma');
    result = await addNameWithPromise(result, 'Mary');
    console.log(result);
  } catch {
    errorHandler();
  }
}

addAllNamesWithAsync();
```
