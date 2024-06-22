# Refine + Nest.JS Boilerplate

Last edited by: Ivan Golubic
Last edited time: August 16, 2023 3:27 PM

This document describes the procedure to create new project using Poliath Refine and Nest.JS templates. 

# Requirements

Node.js: Minimum version is 16, but 18 is highly recommended 

npm: installed and updated

Docker: installed, configured and running

IDE: WebStorm is recommended, although VS Code will make it

# Backend

In order to start our Nest.JS backend, we have to create our new project, based on the template

```bash
git clone --depth 1 https://github.com/poliath/nestjs-poliath-boilerplate.git my-app
cd my-app/
cp env-example .env
```

## Quick run

In order to start the project without development (for a quick test), from your app directory run the command:

```bash
docker compose up -d
```

This command will:

1. Wait for Postgres database container to spin up
2. Run migration (create needed tables in the database)
3. Run seeder (create 2 users and few random articles)
4. Run application in production mode

# Frontend

In order to see data from your backend service we have to run our frontend application (refine based React application). Clone the `poliath-refine-boilerplate` repository in preferred directory:

```bash
git clone --depth 1 https://github.com/poliath/poliath-refine-boilerplate.git frontend
```

Now, head to your directory and install dependencies:

```bash
cd frontend/
npm install
```

After installing dependencies, we have to build our project and run preview mode (basically a local server that will serve our static content. 

```bash
npm run build
npm run preview
```

This command will show you where your application is running, e.g.:

```bash
Local:   http://localhost:4173/
```

head to the location and login. You should see demo users and articles. 

### RBAC explained

Both backend and frontend have RBAC implemented. Admin user can do all operations on Users object, while ‘User’ user can only see articles and manage articles. Later in this documentation this feature will be explained in detail, but in order to experience it login with:

1. admin@example.com - Admin
2. john.doe@example.com - User

********************************************************Password for both users is:******************************************************** secret

### Inferencer explained

One of the important features of [refine.dev](http://refine.dev) is Inferencer (in short, it generates CRUD dashboard based on data from the database, and it provides you the code). If you click on ******************Articles****************** you will see the pop-up. This pop-up is not visible on **********Users********** since raw code (generated by Inferencer) was already implemented in this boilerplate, while in Articles it is not, for showcasing the purpose. You can read more about Inferencer here: [https://refine.dev/docs/packages/documentation/inferencer/](https://refine.dev/docs/packages/documentation/inferencer/)

---

> If everything works, then we can proceed with development setup and develop our application.
> 

# Backend - development

********If Docker containers from Quick run are still running, shut them down in order to avoid any collisions during development phase!******** Head to your backend directory (e.g. my-app) and run:

```bash
docker compose down
```

**************************************************************************************************************************************************************************************************************************************************************************************************************If frontend is running it also might create some confusion, so simple exit the preview server by pressing (Ctrl+C or appropriate shortcut for your OS).**************************************************************************************************************************************************************************************************************************************************************************************************************

In this step we will assume that you already cloned `nestjs-poliath-boilerplate` project. Open your backend directory in your IDE. 

In order to start development, we need to update two environment variables (since we will run Nest.JS project on our local machine using NPM, but our database and some development tools will be in Docker. Open your .env file and;

1. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`
2. Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run Docker containers:

```bash
docker compose up -d postgres adminer maildev
```

*Notice that this command will not start our `api` container.*

### Running Nest.JS project locally

Since we are running our project on our local machine, we have to install dependencies, run seeder and start in development environment.

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

This will start our backend, and you should see logs in the terminal. 

# Frontend - development

Running frontend in development mode is extremely simple. Open your frontend directory in your IDE. And in the terminal, run the following command:

```bash
npm run dev
```

This will start the development server and it will show you on which port it is currently running. If everything is good, you should be able to log in and see your application up and running. 

# Backend - adding new resource

Now we will add new resource to our backend. For this purpose it will be a simple “Task”, it will have: id, title, done, created at, updated at, author, assignee. 

We will use Nest CLI for most of our work, so let’s install it:

```bash
npm install -g @nestjs/cli
```

Nest provides CRUD generator as part of its CLI tool. It generates starting point for your resource. Let’s generate our Tasks resource:

```bash
nest g resource
```

This will start a simple wizard:

```bash
? What name would you like to use for this resource (plural, e.g., "users")? tasks
```

Next, select “REST API” for transport layer.

Select Yes for generating CRUD entry points.

*******************************This will generate all needed files for our “Tasks” resource under tasks directory. Nest will not create DTO by default, it will create only a simple class that we should populate with our data.******************************* 

> **Note:** The database table is not created for each model but only for those models which are declared as **entities**. To declare a model as an entity, we just need to add the ‘**@Entity()**‘ decorator before the declaration of the Class defining our model.
> 

```bash
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: String, nullable: false })
  title: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  author: User;

  @ManyToOne(() => User, (user) => user.tasks)
  assignee: User;
}
```

In the above’s code we created our task model. Nest provides multiple decorators like ****`@CreateDateColumn()`**** that will automatically add date when the entity is created. Additionally ************************************PrimaryGeneratedColumn************************************ is used as primary key. We can pass various ************Column************ options like type or default. 

Additionally, we have ******************ManyToOne****************** relationship since User can be author to many Tasks, and User can have many tasks where he is assignee (in our case Task can have only one assignee. 

Additionally, since we have foreign relationships for User, we have to add it to the ****************user.entity.ts:****************

```bash
@OneToMany(() => Task, (task) => task.author)
  tasks?: Task[];

@OneToMany(() => Task, (task) => task.assignee)
assignedTasks?: Task[];
```

Next, we have to create a migration to be able to apply our changes to the database tables.

```bash
npm run migration:generate -- src/database/migrations/CreateTasks
```

This command will generate new migration file under migrations. Name will be <timestamp-CreateTasks.ts

Next, we have to run our migration:

```bash
npm run migration:run
```

If something is wrong with our previous migration, we can simply revert it:

```bash
npm run migration:revert
```

Above our Tasks Controller class, we have to add the following:

```bash
@Controller({
  path: 'tasks',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('Tasks')
@ApiBearerAuth()
```

Controller decorator will define that that class acts as a controller, which is called though “tasks” path, and version of this API is 1. ******************************************************************This will be also visible ins Swagger******************************************************************. 

UseGuards decorator will define the guards, in this case only jwt (so only authenticated users will be able to access this route. This boilerplate also supports ********************RolesGuard******************** - which is used in conjunction with **********Roles********** decorator, in order to restrict user access for a specific group of users. 

ApiTags defines how this route set will be called in swagger.

ApiBearerAuth defines that this controller needs Bearer token in order to be accessed. 

### Methods in Controller

Since we selected Yes for generating CRUD entry points during resource creation, each method is defined in the controller and has its own decorator (Post, Get, Delete, Patch). 

Calling ******************findAll()****************** method. In this case we can use Postman to call [`http://localhost:3000/api/v1/tasks`](http://localhost:3000/api/v1/tasks) and it should return the message: “This action returns all tasks”, since our ******************************Service is not implemented yet!****************************** 

If it returns error 401, that means that you did not provide bearer token, which you will get by calling a POST request to the [`http://localhost:3000/api/v1/auth/email/login`](http://localhost:3000/api/v1/auth/email/login) with the following JSON body:

```bash
{
    "email": "admin@example.com",
    "password" : "secret"
}
```

Then add your Bearer token to the Authorization field in Postman. 

If you want to restrict a specific route to a specific (or multiple) role, then you have to add the following decorator above the method:

```bash
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
```

This will restrict access only to logged in user of type user. And if you try to call GET method to the previous route (while logged in with Admin account), you will get the following error:

```bash
{
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
}
```

### DTO’s

Data Transfer Object basically transforms our data between our service and database. In TypeORM it can define the structure and validation of our entity, in this case a Task. 

Two main DTO’s are generated by default, “create” and “update”, in some cases they will be the same so “update will only partially extend the “create”, and in some cases it will be different. In our case it will extend our “create: DTO:

```bash
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
```

You can see that this is already generated by default. 

Back to “crate” DTO. 

According to our task entity, we must provide title, author (id) and assignee (id). 

For simplicity our Task DTO will look like this:

```bash
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: number;
  @IsNotEmpty()
  assignee: number;
}
```

It basically defines only that one of the fields cannot be empty. There are multiple decorators and validators that can be used.

### Services

In order to actually do something with our data, we must create some logic. Logic is handled in tasks.service.ts file. First we will write a code for creating new task. 

At.the very beginning we must inject the repository in the constructor of our service class:

```bash
constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
```

Repository is a part of TypeORM and it is basically used for our interaction with the database. 

In order to insert author of our Task, we have to pass current user to the service, so our create method will look like this:

```bash
create(createTaskDto: CreateTaskDto, user: User) {
    createTaskDto.author = user;
    const newTask = this.tasksRepository.save(
      this.tasksRepository.create(createTaskDto),
    );

    return newTask;
  }
```

********************************************************************************************************************************************************But this will not work out of the box, since we need to pass User object to our create method. This boilerplate contains CurrentUser decorator, which returns currently logged in user.********************************************************************************************************************************************************

So, edit “tasks.controller.ts”:

```bash
@Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }
```

Now we can send POST request to the [`http://localhost:3000/api/v1/tasks`](http://localhost:3000/api/v1/tasks) route with the following JSON body:

```bash
{
    "title": "This is a task 4",
    "assignee": 2
}
```

This will assign this task to our user with id = 2 (John Doe), and author will be our signed in user (Admin). 

********************************************************************************************************Next, we will create service for fetching all tasks.******************************************************************************************************** 

In order to do that, we have to edit ********findAll()******** method in tasks.service.ts:

```bash
findAll() {
    return this.tasksRepository.find();
  }
```

This is a simple method that calls ************find()************, which is basically like `SELECT * FROM TASKS;` Now we can call GET method on the [`http://localhost:3000/api/v1/tasks`](http://localhost:3000/api/v1/tasks) endpoint. 

This will return JSON Array of our tasks:

```bash
[
    {
        "id": 1,
        "createdAt": "2023-08-15T10:18:14.437Z",
        "updatedAt": "2023-08-15T10:18:14.437Z",
        "title": "This is a task 1",
        "done": false
    },
    {
        "id": 2,
        "createdAt": "2023-08-15T16:45:51.630Z",
        "updatedAt": "2023-08-15T16:45:51.630Z",
        "title": "This is a task 2",
        "done": false
    }
]
```

Next, we will implement ****************findOne()**************** method in order to fetch data for specific task:

```bash
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne({ id: +id });
  }
```

First we will update our findOne method in controller to pass `{id: +id}` since we will use **************EntityCondition************** to pass fields. Finally our findOne method in service will look like this:

```bash
findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>> {
    return this.tasksRepository.findOne({ where: fields });
  }
```

****************************************Next we will write our update method in service:****************************************

```bash
update(id: Task['id'], payload: DeepPartial<Task>): Promise<Task> {
    return this.tasksRepository.save(
      this.tasksRepository.create({
        id,
        ...payload,
      }),
    );
  }
```

As you can see, we are accepting task id and payload, which is basically Partial DTO, and this method returns Task that we updated. 

****************Next, we will implement delete service****************

This is pretty simple method:

```bash
remove(id: number) {
    return this.articlesRepository.delete(id);
  }
```

> Please note that there are various implementations of these services, I provided the simple ones, there are various ways of updating and handling errors, responses, etc. But this can be implemented based on a specific use-case.
> 

# Frontend - adding new resource

Once we have our backend up and running, we can implement our frontend. 

We will use ****************refine CLI**************** for creating new resources. Refine CLI is installed when project is created with refine create command, but in this boilerplate is already available. 

Position your terminal to your frontend directory (e.g. my-app) and run the following command:

```bash
npm run refine create-resource
```

This wizard will ask you to define your resource name (’tasks’ in our case), and with leave all pages selected. This will generate **********tasks********** directory with all pages needed. Also, it will update App.tsx with new resource data.

> Please note that this command will NOT generate routes, and it will only use Inferencer in generated pages.
> 

**************************************************************************First we will add routes for our tasks**************************************************************************

```bash
<Route path="/tasks">
                  <Route index element={<TasksList />} />
                  <Route path="create" element={<TasksCreate />} />
                  <Route path="edit/:id" element={<TasksEdit />} />
                  <Route path="show/:id" element={<TasksShow />} />
                </Route>
```

These routes are directly related to our pages, but they won’t be visible immediately due to RBAC restrictions.

We have to edit ************casbin************ access control. Open `src/casbin/accessControl.ts` and add the following to the adapter:

```bash
p, 1, tasks, (list)|(create)|(edit)|(show)|(delete)
p, 2, tasks, (list)|(create)|(edit)|(show)|(delete)
```

This will enable both users and admins to make all CRUD operations. 

Now if you refresh your frontend on localhost, and click on Tasks you should see the list of tasks. 

> ******************************************************If not added automatically, add the following to the tasks resource in App.tsx:******************************************************
> 

```bash
meta: {
	       canDelete: true,
      },
```

All pages are generated using Inferencer, a part from refine.dev: [https://refine.dev/docs/packages/documentation/inferencer](https://refine.dev/docs/packages/documentation/inferencer)

If you click on the Inferencer pop up you will see the generated code for a list of tasks, copy this code and paste it in tasks/list.tsx (replace the current code). Pop up will disappear and you will have the flexibility to customize the page. 

> If there is an error in your console or your page is blank, probably page export is wrong (TaskList instead of TasksList), check for this kind of issues.
> 

### i18n - Translations

After exporting, we can edit translation for our page to display real values instead of object fields. Open `public/locales/en/common.json` 

Add the following object to the same level as “users”:

```bash
"tasks": {
    "tasks": "Tasks",
    "fields": {
      "id": "ID",
      "title": "Title",
      "done": "Done",
      "createdAt": "Created at",
      "updatedAt": "Updated at"
    },
    "titles": {
      "create": "Create task",
      "edit": "Edit task",
      "list": "Tasks",
      "show": "Show task"
    }
  },
```

Additionally, under documentTitle, on the same level as users add the following:

```bash
"tasks": {
      "list": "Tasks | Poliath Manager",
      "show": "#{{id}} Show task | Poliath Manager",
      "edit": "#{{id}} Edit task | Poliath Manager",
      "create": "Create new task | Poliath Manager",
      "clone": "#{{id}} Clone task | Poliath Manager"
    },
```

The above’s is used for page titles.

> Add the same fields for other languages.
> 

**When you refresh the page you should see how fields now have names.** 

### Creating new task through our frontend

This is pretty straightforward, just click on Create button and fill out the fields. ****Of course, you can copy the Inferencer code**** to your create.tsx file and for example remove Created at and Updated at fields “since those are handled on our backend”.

When you click save - you will get an error 422 - Unprocessable entity, this is because we are not passing assignee parameter. But how to get it? 

We can use ****************useList****************, although it is a rough option since it loads all users into the memory and we are doing parsing on clients side. Instead we should use useMany, that will call our backend method and retrieve only filtered users that we actually need. 

```bash
const { data: data, isLoading } = useList<IUser>({
        resource: 'users'
    });
```

### Swizzle

Refine provides some solutions out of the box, e.g. data providers, but this code sometimes does not meet our needs. That is is why swizzle exists, it basically  generates the code that can be customized, based on the existing predefined code. 

```bash
npm run refine swizzle
```

This is how we can edit our components, auth pages, auth providers, etc.

[https://refine.dev/docs/tutorial/understanding-dataprovider/swizzle/#what-is-swizzle](https://refine.dev/docs/tutorial/understanding-dataprovider/swizzle/#what-is-swizzle)

# Sending an email

This boilerplate has implemented email service, and usage is implemented in `src/mail/mail.service.ts` which can be used as a reference for customization if needed.

# Additional tools and info

Backend comes with handy tools for development, such as:

1. Swagger - full API documentation ([http://localhost:3000/docs](http://localhost:3000/docs))
2. Adminer - client for database ([http://localhost:8080](http://localhost:8080/))
3. Maildev - SMTP server ([http://localhost:1080](http://localhost:1080/))

> Please note that these services should be disabled in production!
> 

# Running in production

Once you finish your backend logic, you can run it in production using Docker. You should disable above-mentioned development tools.

> Please note that if you were running this boilerplate previously, in order to “catch” latest updates of your code, migrations, etc. You first have to rebuild docker image!
>

```bash
docker compose build --no-cache
```

**Logging is implemented by default and logs are available in the `./logs` directory.**

# Conclusion

Please note that there can be a lot of situations where you will have to edit default code (e.g. change querying methods, update current DTO’s, etc.) But this is a great starting point for any project. 

Additionally, this documentation will be updated or fixed as needed, with new features, fixes and improvements. 

# Issues and errors

Please be aware that this documentation is primarily designed to expedite your onboarding process. While it may offer some "shortcut" solutions, these are intended purely for illustrative purposes to help clarify the workings of this boilerplate. Should you encounter any issues with the boilerplate, whether on the frontend or backend, we encourage you to raise an issue on GitHub:

- Refine boilerplate: https://github.com/poliath/poliath-refine-boilerplate
- NestJS boilerplate: https://github.com/poliath/nestjs-poliath-boilerplate