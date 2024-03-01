
# Recipe Manager

A straightforward recipe management application featuring Create, Read, Update, and Delete (CRUD) functionality for organizing recipes by title, instructions, and ingredients.


## Authors

- [@Hoai Vu Nguyen](https://github.com/hvnsoft)


![Logo](https://avatars.githubusercontent.com/u/156953199?v=4)



## Key Features

- CRUD operations via Rest APIs.

- Search and Filter capabilities based on titles and ingredients.

- Responsive User Interface utilizing Material UI.



## 🛠 Technology Used
TypeScript, Node.js, Express.js, Prisma, PostgreSQL, React 18, React Hooks, React Query, Material UI, Rest API



## Screenshots

![App Screenshot]()


## API Reference

#### Read all recipes

```http
  GET /api/recipes
```


| Parameter | Type     | Description                |  
| :-------- | :------- | :------------------------- | 
| `pageNumber` | `string` | **Required** |
| `title` | `string` | **Option** |
| `filter` | `string[]` | **Option** |


#### Read recipe by id

```http
  GET /api/recipes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |

#### Create recipe

```http
  POST /api/recipes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** |
| `instruction`      | `string` | **Required** |
| `ingredients`      | `string` | **Required** e.g. "salt:5g,sugar:10g, milk:200ml, beef : 300g" |

#### Update recipe by id

```http
  PUT /api/recipes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |
| `title`      | `string` | **Required** |
| `instruction`      | `string` | **Required** |
| `ingredients`      | `string` | **Required** e.g. "salt:5g,sugar:10g, milk:200ml, beef : 300g" |

#### Delete recipe by id

```http
  DELETE /api/recipes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |


## Installation and Start, Test

Install PostgreSQL and host database

If you don't use Postgres 16 (or use previous versions) please install the PostgreSQL 16 at first.
(https://filehippo.com/download_postgresql/)

After installation of Postgres 16
```bash
  C:\Program Files\PostgreSQL\16\bin>pg_ctl start -D "<db_path>"
```

To install packages, run the following command
```bash
  npm run install-all
```

To run test, run the following command
```bash
  npm run test-all
```

To run start, run the following command
```bash
  npm run start-all
```