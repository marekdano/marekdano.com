---
title: 'Closure in Javascript'
date: '2020-05-18'
template: 'post'
draft: false
slug: 'closure-in-javascript'
category: 'Coding'
tags:
  - 'Javascript fundamentals'
  - 'Interviewing'
description: 'Javascript closure described in the simple way.'
socialImage: ''
# published: false
# cover_image: ''
# canonical_url: 'https://marekdano.com/blog/closure-in-javascript/'
---

The closure in javascript is one of the main concepts which each javascript developer needs to grasp. It is also used in the interviews for frontend developers.

So, what"s the **closure**?

We can understand it by great definition from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) documentation where stays:

> A closure is a special kind of object that combines two things: a function, and the environment in which the function was created. The environment consists of local variables that were in-scope at the time that the closure was created.

In other words, the closure is created when a function is returned from another function and that returned function has access to the outer function"s scope. The closure is created at the function creation time.

Let say we have a function of

```javascript
function getFamily(familyName) {
  return (firstName) => `${firstName} ${familyName}`;
}
```

We can create a `family` function by calling the function `getFamily` and passing `familyName` into that function. Calling the function `getFamily` returns a function. The closure is created with the scope defined. The scope contains `familyName`. If we call that returned function (closure) from `getFamily`, in our case `family` and passing `firstName` into that function we can get the full name. The reason we can get `familyName` is that we have access to the outer scope of the returned function where `familyName` exists. Remember the variable `familyName` was created when the function of `family` was created. Hopefully what I said now makes sense when we execute the following code

```javascript
const family = getFamily('Smith');

const fatherFullName = family('John');
const motherFullName = family('Emma');

console.log(fatherFullName); // John Smith
console.log(motherFullName); // Emma Smith
```

The closure is also used when we want to keep the variables defined in the function private, not to be accessible outside of the scope. The variables can then be modified inside of the scope. Consider this extended code

```javascript
function getFamily(familyName) {
  const familyMembers = [];

  function addMember(firstName) {
    familyMembers.push(firstName);
  }
  const listOfFamilyMembers = () => familyMembers.toString();
  const getFamilyName = () => familyName;

  return {
    addMember,
    listOfFamilyMembers,
    getFamilyName,
  };
}
```

The variable of `familyMember` won't be accessible. It can be called or modified in the functions which are defined in the scope when the function of `getFamily` is created. If we want `familyMember` to be accessible from `getFamily` we can add it to the object returned from that function, but in this case, the variable won't be private anymore.

Now please follow the code and let me know what will be logged. Try to execute the code in your head first before testing it in your preferred javascript console.

```javascript
const family = getFamily('Smith');
family.addMember('John');
family.addMember('Emma');
family.addMember('Josh');

console.log(family.listOfFamilyMembers()); // ???
console.log(family.getFamilyName()); // ???
```

<!--
ADDITION DEFINITION for CLOSURE
a closure is a function, along with all variables or functions that were in-scope at the time that the closure was created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body of another function. An important feature of closures is that an inner function still has access to the outer function’s variables.

A closure is a locally declared variable related to a function that stays in memory when the function has returned.
https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8

In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

Consider closure where was created(declare) rather where you were calling it
-->
