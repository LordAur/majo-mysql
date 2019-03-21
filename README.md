# MajoDB Mysql
[![npm version](http://img.shields.io/npm/v/majodb-mysql-builder.svg)](https://npmjs.org/package/majodb-mysql-builder)
[![Build Status](https://travis-ci.org/LordAur/majo-mysql.svg?branch=master)](https://travis-ci.org/LordAur/majo-mysql)
[![Coverage Status](https://coveralls.io/repos/github/LordAur/majo-mysql/badge.svg?branch=master)](https://coveralls.io/github/LordAur/majo-mysql?branch=master)
[![Dependencies Status](https://david-dm.org/lordaur/majodb-mysql-builder.svg)](https://david-dm.org/lordaur/majodb-mysql-builder)
> **MajoDB Mysql Builder is query builder with expressive code that makes your day more enjoyable**

You can use this query builder for Mysql and MariaDB then require NodeJS version 8+. 

MajoDB is available for use under [MIT LICENSE](https://github.com/LordAur/majo-mysql/blob/master/LICENSE)

You can report bugs and discuss features on the [GitHub issues page](https://github.com/LordAur/majo-mysql/issues), or send tweets to [@LordAur](https://twitter.com/LordAur).

## Features
* Full featured query
* Expressive method
* Schema builders
* Database Manager (WIP)
* Relationships (WIP)

## Installation
```shell
npm i majodb-mysql-builder
```

## How to use
### Initializing the library
The MajoDB module is itself a function which takes a configuration object for Majo.
```js
const majo = require('majodb-mysql-builder')
  .connection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  });
```

### Retrieving results
#### Retrieving All Rows From A Table
You can get query results as a Array with use **.get()** method.
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
#### Retrieving A Single Row / Column From A Table
If you want get single row from query result as Object, you can use **.first()** method.
```js
majo
  .select()
  .from('users')
  .first()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
#### Pluck - .pluck(column)
If you want get one column for the result, you can use   **.pluck()** method
```js
majo
  .select()
  .from('users')
  .pluck('email')
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
### Query Builders

### Select Clause
#### Select - .select(columns)
If you want select all columns from a database table.
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
You may not always want to select all columns from a database table. Using the **select** method, you can specify a custom select clause for the query:
```js
majo
  .select('name', 'email as user_email')
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT name, email AS user_email FROM users
```
The **distinct** method allows you to force the query to return distinct results:
```js
majo
  .table('users')
  .distinct()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT DISTINCT * FROM users
```
#### Table - .table(table name)
You use **.table()** or **from()** for selecting spesific table.
```js
majo
  .table('users')
  .select()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
#### From - .from(table name)
```js
majo
  .select()
  .from('users')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users
```
### Aggregates
The query builder also provides a variety of aggregate methods such as **count**, **max**, **min**,  **avg**, and **sum**.
#### Count - .count(columns, asColumn)
```js
majo
  .table('users')
  .count()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(*) FROM users
```
Or you can **count** as a spesific column like this:
```js
majo
  .table('users')
  .count('*', 'user_total')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(*) AS user_total FROM users
```
Also you can count row with **distinct** method like this:
```js
majo
  .table('users')
  .countDistinct('id', 'user_total')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT COUNT(DISTINCT id) FROM users
```
#### Avg - .avg(column, asColumn)
```js
majo
  .table('orders')
  .avg('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT AVG(*) FROM orders
```
Or you can get **avg** from spesific column, with combine method.
```js
majo
  .table('orders')
  .avg('price', 'average_price')
  .where('status', true)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT AVG(*) AS average_price FROM orders WHERE status = true
```
#### Sum - .sum(column, asColumn)
```js
majo
  .table('orders')
  .sum('orderId')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT SUM(orderId) FROM orders
```
#### Min - .min(column, asColumn)
```js
majo
  .table('orders')
  .min('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT MIN(price) FROM orders
```
#### Max - .max(column, asColumn)
```js
majo
  .table('orders')
  .max('price')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT MAX(price) FROM orders
```
### Joins
The Majo query builder may also be used to write **join** statements
#### Inner Join - .join(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .join('contacts', 'users.id', '=', 'contacts.user_id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users INNER JOIN contacts ON users.id = contacts.user_id
```
#### Join Raw - .joinRaw(query)
If you want write it raw, you can use **joinRaw()** method like this:
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .joinRaw('INNER JOIN contacts ON users.id = contacts.user_id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users INNER JOIN contacts ON users.id = contacts.user_id
```
#### Left Join - .leftJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .leftJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users LEFT JOIN contacts ON users.id = contacts.user_id
```
#### Right Join - .rightJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .rightJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users RIGHT JOIN contacts ON users.id = contacts.user_id
```
#### Left Outer Join - .leftOuterJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .leftOuterJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users LEFT OUTER JOIN contacts ON users.id = contacts.user_id
```
#### Right Outer Join - .rightOuterJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .rightOuterJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users RIGHT OUTER JOIN contacts ON users.id = contacts.user_id
```
#### Cross Join - .crossJoin(tableName, joinColumn, operator, selectColumn)
```js
majo
  .select('users.*', 'contacts.phone')
  .table('users')
  .crossJoin('contacts', 'users.id', '=', 'contacts.id')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT users.*, contacts.phone FROM users CROSS JOIN contacts ON users.id = contacts.user_id
```
### Where Clause
The Majo query builders may also be used to write **where** statements. The basics style where statements use three arguments, field, operator and value.
#### Simple where - .where(column, operator, value)
```js
majo
  .table('users')
  .where('email', '=', 'test@mail.com')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
You can also without use operator with where statements like this:
```js
majo
  .table('users')
  .where('email', 'test@mail.com')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
You can write it raw like this:
```js
majo
  .table('users')
  .whereRaw(`email = 'test@mail.com'`)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE email = 'test@mail.com'
```
You may use a variety of other operators when writing a **where** clause:
```js
majo
  .table('users')
  .where('email', 'like', '%@gmail.com%')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE email LIKE '%@gmail.com%'
```
```js
majo
  .table('orders')
  .where('price', '>=', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price >= 5000
```
You may also pass an object of conditions to the **where** statement
```js
majo
  .table('users')
  .where({
     first_name: 'Yudha',
     last_name: 'Pratama',
  })
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = 'Yudha' AND last_name = 'Pratama'
```
You may be used **Or Where** conditions and used **orWhere** method like this:
```js
majo
  .table('orders')
  .where('price', '=', 5000)
  .orWhere('price', '=', 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price = 5000 OR price = 10000
```
#### Where In - .whereIn(column, [array] | string | number)
```js
majo
  .table('users')
  .whereIn('id', [1, 5, 9])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE id IN (1, 5, 9)
```
#### Where Not In - .whereNotIn(column, [array] | string | number)
```js
majo
  .table('users')
  .whereNotIn('id', [1, 5, 9])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE id NOT IN (1, 5, 9)
```
#### Where Null - .whereNull(column)
```js
majo
  .table('users')
  .whereNull('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name IS NULL
```
#### Where Not Null - .whereNotNull(column)
```js
majo
  .table('users')
  .whereNotNull('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name IS NOT NULL
```
#### Where Empty String - .whereEmptyString(column)
```js
majo
  .table('users')
  .whereEmptyString('last_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name = ''
```
#### Where Between - .whereBetween(column, startNumber, endNumber)
```js
majo
  .table('orders')
  .whereBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price BETWEEN 5000 AND 10000
```
#### Where Not Between - .whereNotBetween(column, startNumber, endNumber)
```js
majo
  .table('orders')
  .whereNotBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price NOT BETWEEN 5000 AND 10000
```
You may be used **whereBetwwen** method and **whereNotBetween** with OR statement like this
```js
majo
  .table('orders')
  .whereNotBetween('price', 1000, 2000)
  .whereNotBetween('price', 5000, 10000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders WHERE price NOT BETWEEN 1000 AND 2000 OR price NOT BETWEEN 5000 AND 10000
```
#### Where Column - .whereColumn(firstColumn, operator, secondColumn)
The **whereColumn** method may be used to verify that two columns are equal
```js
majo
 .table('users')
 .whereColumn('first_name', 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = last_name
```
Or you can use with operator like this:
```js
majo
 .table('users')
 .whereColumn('first_name', '!=' 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name != last_name
```
Or used much columns checking
```js
majo
 .table('users')
 .whereColumn({
  first_name: 'last_name',
  username: 'email'
 })
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE first_name = last_name AND username = email
```
You may be used **whereColumn** methid with OR statement like this:
```js
majo
 .table('users')
 .whereNotNull('last_name')
 .orWhereColumn('first_name', '!=' 'last_name')
 .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE last_name NOT NULL OR WHERE first_name != last_name
```
#### Where Exists - .whereExists()
The **whereExists** method allows you to write where exists SQL clauses. You can write SQL clause with same line without inside block.
```js
majo
  .table('users')
  .whereExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endWhereExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endWhereExists** method to end the use of **whereExists** SQL clause.
#### Where Not Exists - .whereNotExists()
```js
majo
  .table('users')
  .whereNotExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endWhereNotExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users WHERE NOT EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endWhereNotExists** method to end the use of **whereNotExists** SQL clause.

### Ordering, Grouping, Limit & Offset
The Majo query builders may also be used to write **order by**, **group by**, **offset** and **limit** statement.
#### Order By - .orderBy(column, [by clause])
```js
majo
  .table('users')
  .orderBy('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
Or you can use by clause like this
```js
majo
  .table('users')
  .orderBy('created_date', 'ASC')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
You can write it raw like this:
```js
majo
  .table('users')
  .orderByRaw('created_date ASC')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
#### Order By Desc - .orderByDesc(column)
```js
majo
  .table('users')
  .orderByDesc('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date DESC
```
#### Latest - .latest(column)
You can use **latest** method without any argument. The **latest** method argument by default is **created_date**
```js
majo
  .table('users')
  .latest('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date DESC
```
#### Oldest - .oldest(column)
You can use **oldest** method without any argument. The **oldest** method argument by default is **created_date**
```js
majo
  .table('users')
  .oldest('created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users ORDER BY created_date ASC
```
#### Group By - .groupBy(columns)
```js
majo
  .table('orders')
  .groupBy('status')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY status
```
Or you can use much fields for grouping like this
```js
majo
  .table('orders')
  .groupBy('status', 'created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```js
majo
  .table('orders')
  .groupByRaw('status, created_date')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY status, created_date
```
### Having Clause
The Majo query builders may also be used to write **having** method. Having clause used to search keywords with aggregates
#### Having - .having(column, [operator], value)
```sql
majo
  .table('orders')
  .groupBy('price')
  .having('price', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price = 5000
```
Or you can use **having** method without operator, like this:
```sql
majo
  .table('orders')
  .groupBy('price')
  .having('price', '>', 5000)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price > 5000
```
#### Having In - .havingIn(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingIn('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price IN (5000, 1000)
```
#### Having Not In - .havingNotIn(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotIn('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price NOT IN (5000, 1000)
```
#### Having Null - .havingNull(column)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNull('client_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING client_name IS NULL
```
#### Having Not Null - .havingNotNull(column)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotNull('client_name')
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING client_name IS NOT NULL
```
#### Having Between - .havingBetween(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingBetween('price', [5000, 1000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price BETWEEN 5000 AND 10000
```
#### Having Not Between - .havingNotBetween(column, values)
```sql
majo
  .table('orders')
  .groupBy('price')
  .havingNotBetween('price', [5000, 10000])
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM orders GROUP BY price HAVING price NOT BETWEEN 5000 AND 10000
```
#### Having Exists - .havingExists()
The **havingExists** method allows you to write having exists SQL clauses. You can write SQL clause with same line without inside block.
```js
majo
  .table('users')
  .groupBy('id')
  .havingExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endHavingExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users GROUP BY id HAVING EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endHavingExists** method to end the use of **havingExists** SQL clause.
#### Having Not Exists - .havingNotExists()
```js
majo
  .table('users')
  .groupBy('id')
  .havingNotExists()
  .table('orders')
  .whereColumn('users.id', 'orders.user_id')
  .endHavingExists()
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users GROUP BY id HAVING NOT EXISTS ( SELECT * FROM orders WHERE users.id = orders.user_id )
```
Remember you should write **endHavingNotExists** method to end the use of **havingNotExists** SQL clause.

### Offset & Limit
The Majo query builder may be used to **offset** and **limit** statement.
#### Offset - .offset(number) And Limit - .limit(number)
```js
majo
  .table('users')
  .limit(100)
  .offset(0)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users LIMIT 100 OFFSET 0
```
Or you can use **skip** for change **offset** method, and use **take** for change **limit** method.
```js
majo
  .table('users')
  .take(100)
  .skip(0)
  .get()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SELECT * FROM users LIMIT 100 OFFSET 0
```
### Inserts
The Majo query builder also provides an **insert** method for inserting records into the database table. The **insert** method accepts an object names and values:
#### Insert - .insert(object | string argument)
```js
majo
  .table('users')
  .insert({ 
    first_name: 'Test',
    last_name: 'User'
  });
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User')
```
Or you can insert with argument like this:
```js
majo
  .table('users')
  .insert('first_name', 'Test');
```
```sql
INSERT INTO users (first_name) VALUES ('Test')
```
You may also want to inserted much values like this:
```js
majo
  .table('users')
  .insert([
    {
      first_name: 'Test',
      last_name: 'User 1',
    },
    {
      first_name: 'Test',
      last_name: 'User 2',
    }
  ]);
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User 1'), ('Test', 'User 2')
```
And then if you want get last inserted id, you can use **insertgetId** method, like this:
```js
majo
  .table('users')
  .insertGetId({ 
    first_name: 'Test',
    last_name: 'User'
  })
  .first()
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
INSERT INTO users (first_name, last_name) VALUES ('Test', 'User')
```
### Updates
The Majo query builder also provides an **update** method for updating records. The **update** method accepts an object names and values:
### Update - .update(object | string argument)
```js
majo
  .table('users')
  .where('user_id', 1)
  .update({
    first_name: 'Test',
    last_name: 'User',
  });
```
```sql
UPDATE users SET first_name = 'Test', last_name = 'User'
```
Or you can write with string argument like this
```js
majo
  .table('users')
  .where('user_id', 1)
  .update('first_name', 'Test');
```
```sql
UPDATE users SET first_name = 'Test'
```
### Increment & Decrement
The Majo query builder also provides convenient methods for incrementing or decrementing the value of a given column.
#### Increment - .increment(column, [number])
```js
majo
  .table('users')
  .increment('votes');
```
```sql
UPDATE users SET votes = votes + 1
```
Or you can custom value like this:
```js
majo
  .table('users')
  .increment('votes', 10);
```
```sql
UPDATE users SET votes = votes + 10
```
#### Decrement - .decrement(column, [number])
```js
majo
  .table('users')
  .decrement('votes');
```
```sql
UPDATE users SET votes = votes - 1
```
Or you can custom value like this:
```js
majo
  .table('users')
  .decrement('votes', 10);
```
```sql
UPDATE users SET votes = votes - 10
```
### Deletes
The Majo query builder also provides an **delete** method to remove records from database table.
#### Delete - .delete()
```js
majo
  .table('users')
  .where('user_id', 1)
  .delete();
```
```sql
DELETE FROM users WHERE user_id = 1
```
#### Truncate - .truncate(table)
If you want clear the data from your database table, you can use **truncate** method.
```js
majo
  .truncate('users')
```
```sql
TRUNCATE TABLE users
```
### Another Methods
#### Column Info
With Majo query builder, you can get all information from your database table like field name, type field and other information.
```js
majo
  .columnInfo('users')
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```
```sql
SHOW COLUMNS FROM users
```

## Schema Builders
### Schema
To use schema builder, you have to use **schema** method. 
```js
Majo
  .schema();
```
Also, if you want to use a different database from your Majo configuration, you can use **withSchema** method like this:
```js
Majo
  .schema()
  .withSchema('database_name');
```
### Tables
#### Creating Table
To create a new database table, use **createTable** method after **schema()** method. The **createTable** method accepts two argument, table name string and **Closure** table.
```js
Majo
  .schema()
  .createTable('users', (table) => {
    table.increment();
    table.string('username', 100);
  });
```
When creating the table, you may use any of the schema builder's column methods to define the table's columns.

#### Available Column Type
| Command | Description |
| ------- | ----------- |
| ``` table.increment('id'); ``` | Auto-incrementing UNSIGNED INT (primary key). If you want not use argument, the default column name is **id** |
| ``` table.tinyIncrement('id'); ``` | Auto-incrementing UNSIGNED TINYINT (primary key). If you want not use argument, the default column name is **id** |
| ``` table.smallIncrement('id'); ``` | Auto-incrementing UNSIGNED SMALLINT (primary key). If you want not use argument, the default column name is **id** |
| ``` table.mediumIncrement('id'); ``` | Auto-incrementing UNSIGNED MEDIUMINT (primary key). If you want not use argument, the default column name is **id** |
| ``` table.bigIncrement('id'); ``` | Auto-incrementing UNSIGNED BIGINT (primary key). If you want not use argument, the default column name is **id** |
| ``` table.bigInteger('data'); ``` | BIGINT equivalent column | 
| ``` table.binary('data'); ``` | BLOB equivalent column | 
| ``` table.boolean('status'); ``` | BOOL or TINYINT equivalent column |
| ``` table.char('name', 100); ``` | CHAR equivalent column with optional length |
| ``` table.date('created_at'); ``` | DATE equivalent column |
| ``` table.dateTime('created_at'); ``` | DATETIME equivalent column |
| ``` table.decimal('amount', 8, 2); ``` | DECIMAL equivalent column with a precision (total digits) and scale (decimal digits) |
| ``` table.double('amount', 8, 2); ``` | DOUBLE equivalent column with a precision (total digits) and scale (decimal digits) |
| ``` table.enum('level', ['easy', 'hard]); ``` | ENUM equivalent column |
| ``` table.float('amount', 8, 2); ``` | FLOAT equivalent column with a precision (total digits) and scale (decimal digits) |
| ``` table.geometry('positions'); ``` | GEOMETRY equivalent column |
| ``` table.geometryCollection('positions'); ``` | GEOMETRYCOLLECTION equivalent column |
| ``` table.integer('price'); ``` | INTEGER equivalent column |
| ``` table.ipAddress('visitor'); ``` | IP address equivalent column |
| ``` table.json('options'); ``` | JSON equivalent column |
| ``` table.lineString('positions'); ``` | LINESTRING equivalent column |
| ``` table.longText('content'); ``` | LONGTEXT equivalent column |
| ``` table.macAddress('device'); ``` | MAC address equivalent column |
| ``` table.mediumInteger('price'); ``` | MEDIUMINT equivalent column |
| ``` table.mediumText('content'); ``` | MEDIUMTEXT equivalent column |
| ``` table.multiLineString('positions'); ``` | MULTILINESTRING equivalent column |
| ``` table.multiPoint('positions'); ``` | MULTIPOINT equivalent column |
| ``` table.multiPolygon('positions'); ``` | MULTIPOLYGON equivalent column |
| ``` table.point('positions'); ``` | POINT equivalent column |
| ``` table.polygon('positions'); ``` | POLYGON equivalent column |
| ``` table.rememberToken(); ``` | Adds a nullable  remember_token VARCHAR(100) equivalent column |
| ``` table.smallInteger('price'); ``` | SMALLINT equivalent column |
| ``` table.string('username', 100); ``` | VARCHAR equivalent column with optional length |
| ``` table.text('content'); ``` | TEXT equivalent column |
| ``` table.time('sunrise'); ``` | TIME equivalent column |
| ``` table.timeStamp('created_at'); ``` | TIMESTAMP equivalent column |
| ``` table.timestamps(); ``` | Adds nullable created_at and updated_at TIMESTAMP equivalent columns |
| ``` table.tinyInteger('price'); ``` | TINYINT equivalent column |
| ``` table.unsignedBigInteger('price'); ``` | UNSIGNED BIGINT equivalent column |
| ``` table.unsignedDecimal('amount', 8, 2); ``` | UNSIGNED DECIMAL equivalent column with a precision (total digits) and scale (decimal digits) |
| ``` table.unsignedInteger('price'); ``` | UNSIGNED INT equivalent column |
| ``` table.unsignedMediumInteger('price'); ``` | UNSIGNED MEDIUMINT equivalent column |
| ``` table.unsignedSmallInteger('price'); ``` | UNSIGNED SMALLINT equivalent column |
| ``` table.unsignedTinyInteger('price'); ``` | UNSIGNED TINYINT equivalent column |
| ``` table.uuid('id'); ``` | UUID equivalent column |
| ``` table.year('birth_year'); ``` | YEAR equivalent column |

#### Column Modifiers
In addition to the column types listed above, there are several column modifiers you may use while adding a column. For example, to make the column nullable, you may use the nullable method like this:
```js
Majo
  .schema()
  .createTable('users', (table) => {
    table.string('username', 100).nullable();
  });
```

Below is a list of all the available column modifiers. This list does not include the index modifiers:

| Modifier | Description | 
| -------- | ----------- |
| ``` .after('column_name') ``` | Place the column "after" another column |
| ``` .autoIncrement() ``` | Set INT column as AUTO_INCREMENT (primary key) |
| ``` .charset('utf8') ``` | Set specify character set for the column |
| ``` .collation('utf8_unicode_ci') ``` | Set specify collation for the column |
| ``` .comment('write comment') ``` | Add a comment to a column |
| ``` .default(value) ``` | Add a default value to a column |
| ``` .first() ``` | Place column position to the first |
| ``` .nullable() ``` | Set null values, or you can pass arguments with false to make column not null |
| ``` .unsigned() ``` | Set INT column as unsigned |
| ``` .useCurrent() ``` | Set TIMESTAMP columns to use CURRENT_TIMESTAMP as default value |

#### Table Options
If you want to schema a database table with your configuration, you can add it to the **createTable** method like this:

```js
Majo
  .schema()
  .createTable('users', (table) => {
    table.string('username', 100).nullable();
    table.setEngine('InnoDB');
  });
```

You may use the following commands on the schema builder to define the table's options:

| Command | Description |
| ------- | ----------- |
| ``` table.setEngine('InnoDB'); ``` | Set specify the table storage engine |
| ``` table.setCharset('utf8'); ``` | Set a default character set for the table |
| ``` table.setCollation('utf8_unicode_ci'); ``` | Set a default collation for the table |
| ``` table.setComment('write comment'); ``` | Add a comment to a database table |
| ``` table.setAutoIncrement(1); ``` | Set start auto increment number |

#### Checking For Table / Column Existence
You may easily check for the existence of a table or column using the hasTable and hasColumn methods:
```js
Majo
  .schema()
  .hasTable('users')
  .then((exists) => {
    if (!exists) {
      Majo
        .schema()
        .createTable('users', (table) => {
          table.increment();
          table.string('username', 100);
        });
    }
  });
```

```js
Majo
  .schema()
  .updateTable('users', (table) => {
    Majo
      .schema()
      .hasColumn('users', 'username')
      .then((exists) => {
        if (!exists) {
          table.string('username', 100);
        }
      });
  });
```

#### Renaming / Dropping Tables
To rename an existing database table, use the **renameTable** method:

```js
Majo
  .schema()
  .renameTable('from', 'to')
  .then(() => {
    res.status(200);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```

To drop an existing table, you may use the **dropTable** or **dropTableIfExists** methods:

```js
Majo
  .schema()
  .dropTableIfExists('users')
  .then(() => {
    res.status(200);
  })
  .catch((err) => {
    res.status(500).json(err);
  });

Majo
  .schema()
  .dropTable('users')
  .then(() => {
    res.status(200);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
```

#### Modifying Columns
The **updateTable** method allows you to modify table. You can create a new column or modify existing column with **change** method. For example, you want to change type length of a string column. To see the **change** method in action, let's increase the size of the name column from 25 to 50:

```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.string('username', 50).change();
  });
```

We could also modify column with available method in column modifiers liekk this:
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.string('username', 50).nullable().change();
  });
```

If you want to create a new column for existing table, you can write like this:
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.string('email', 50);
  });
```

#### Renaming Columns
To rename a existing column, you may use the **renameColumn** method. 
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.renameColumn('from', 'to');
  });
```

#### Dropping Columns
To drop a column, use the **dropColumn** method. 
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.dropColumn('username');
  });
```

Also you can drop more than one column at once.
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.dropColumn('username', 'email');
  });
```

### Indexes
#### Create Indexes
The schema builder supports several types of indexes. To create the index, you can chain the index method onto the column definition like this:
```js
Majo
  .schema()
  .createTable('users', (table) => {
    table.string('email').unique();
  });
```

Alternatively, you may create the index after defining the column. For example:
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.unique('email');
  });
```

You may even pass more than one arguments of columns to an index method to create a compound (or composite) index:
```js
table.unique('username', 'email');
```

#### Available Index Types
Each index method accepts an optional second argument to specify the name of the index.

| Command | Description |
| ------- | ----------- |
| ``` table.primary('id'); ``` | Adds a primary key |
| ``` table.primary('id', 'parent_id'); ``` | Adds primary composite keys |
| ``` table.unique('username'); ``` | Adds a unique index |
| ``` table.unique('username', 'email'); ``` | Adds a unique compiste keys index |
| ``` table.index('username'); ``` | Adds a plain index |
| ``` table.index('username', 'email'); ``` | Adds a plain composite keys index |
| ``` table.spatial('username'); ``` | Adds a spatial index |

#### Renaming Indexes
To rename an index, you may use the **renameIndex** method. Please remember, the index name from Majo uses a combination table name, column name, and index type. For example, you want to create a unique index for username column on users table. Then, the index name will become `users_username_unique`.
```js
Majo
  .schema()
  .updateTable('users', (table) => {
    table.renameIndex('column_name', 'old_index', 'new_index');
  });
```

If you want renaming another available index type, use this:

| Command | Description |
| ------- | ----------- |
| ``` table.renameIndex('column_name', 'old_key_name', 'new_key_name'); ``` | Rename a basic index |
| ``` table.renameUnique('column_name', 'old_key_name', 'new_key_name'); ``` | Rename a unique index |

#### Dropping Indexes
To drop an index, use your column name only. By default, Majo automatically generate a reasonable name to the indexes. It's combination of table name, column name and index type.

| Command | Description |
| ------- | ----------- |
| ``` table.dropPrimary('id'); ``` | Drop a primary key from the table |
| ``` table.dropUnique('email'); ``` | Drop a unique index from the table |
| ``` table.dropIndex('state'); ``` | Drop a basic index from the table |
| ``` table.dropSpatial('location'); ``` | Drop a spatial index from the table |

### Foreign Key
Majo also provides support for creating foreign key constraints, which are used to force referential integrity at the database level. For example, let's define a  `user_id` column on the `posts` table that references the `id` column on a `users` table:

```js
Majo
  .schema()
  .createTable('posts', (table) => {
    table.increment('user_id').primary();

    table.foreign('user_id')
      .references('id').on('users');
  });
```

You may also specify the desired action for the "on delete" and "on update" properties of the constraint:

```js
Majo
  .schema()
  .createTable('posts', (table) => {
    table.increment('user_id').primary();

    table.foreign('user_id')
      .references('id').on('users')
      .onDelete('cascade');
  });
```

To drop a foreign key, you may use the **dropForeign** method. Foreign key constraint use the same naming as indexes. The constraint name it's combination of table name, column name and "_foreign". But, you just fill in the column name to drop a foreign key. By default, Majo will generate the constraint name.

```js
Majo
  .schema()
  .updateTable('posts', (table) => {
    table.dropForeign('id');
  });
```
