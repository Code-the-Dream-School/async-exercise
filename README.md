# JavaScript Asynchronous Programming with NodeJS and MongoDB

## Part 1: Setting up for MongoDB

As is usual for the Code The Dream assignments, you fork this repository and then clone your
fork to the development machine.  That will create your project directory, called async-exercise.
Switch to this directory, and then do

```
git checkout -b async
```

That will create a git branch called async and switch to it.

Many web appllications based on Node use, as the database, a no-SQL database called MongoDB.
You will use MongoDB extensively during this class.  For this purpose, you should sign up for
a free account with MongoDB Atlas at https://www.mongodb.com/atlas/database .  Click on "try free".
Complete the form with your email, name, and password.  You may choose to sign in via your gmail
account.  Then accept the terms of service and click on the Get Started Free button. You will be
taken to a page that says "build my first cluster".  Near the end of the page, there is a field
for the cluster name.  It is not critical what you call it, but you could call it Cluster0.
Then click the button that says Create Cluster.

The cluster will have a white list for network access.  You will see a link for Network Access
under Security on the left hand side of the screen.  Click on this link and enter 0.0.0.0/0
as the whitelist entry, so that you can connect from any address.  Then click Confirm.

Also under Security on the left hand side, you will find a link for Database Access.  A pop-up
will prompt you for a username and password. You will need these values later.  This is not
the same as the username and password for your MongoDB Atlas account.

Now click on Clusters, under the Atlas in the left sidebar. You will see an option Connect your
application.  Click on that.  Then click on the second option that says Connect Your Application.
Then copy the connection string to your clipboard.  It will look something like

```
MONGO_URI=mongodb+srv://<your_userid>:<your_password>@cluster0.xqmn4.mongodb.net/test?retryWrites=true

```
You will need to substitute your database username and password.  Also, change test to asyncExercise.
That is the name for the database document collection you will read and write during this 
assignment.

Create a file called .env in your working directory.  It should have one line,

```
MONGODB_URL=<your database connection string>
```
Where this is the database connection string you got in the previous step.

Now do npm install.  This will install the npm packages you need to run the assignment.

Now, do node mongowriter.js.  This will run an application that actually reads and writes
to your database.  If it shows errors, that means you do not have the correct connection string
in the .env file.

If it does work, congratulations, you are on MongoDB!

## Part 2: Asynchronous Programming

JavaScript is a single threaded language.  That means that if function calls take a long time,
nothing will happen in the application until they return.  That is very bad for a web application,
which should remain responsive.  So, function calls such as database calls, which may take
some time to complete, send out a work request to the database, and execution continues.  To
pick up the result of the work request, you have a callback, a function that is called
when the work request completes.  You will have watched a video about this.  If you have
a series of asynchronous requests, you will end up with a nested collection of callbacks,
which eventually gets very messy.  To keep programs intelligible, modern JavaScript has
what are called Promises.  A promise is returned by the asynchronous function.  Subsequently
the promise can be resolved to get the resulting value.  There are two ways to resolve
a promise, using a then block or using an await statement.

The assignment includes a program called sleeper.js.  It uses the setTimeout function to 
wait for one second.  Now, as we have said, JavaScript does not just stop for that one second.
It continues to process the rest of the statements in the file, and executes the function
you specify, called the callback, when (a) the timeout is complete, and (b) it doesn't
have another immediate task to do. We do this three ways.  FIrst, we wait three times
using nested callbacks.  You can see that this would get messy.  For the other two
approaches, we create a function called sleep, which returns a promise to handle
the callback.  We use that sleep with promise function two ways.  First we use the then
method, and then we use the async/await method.  A function must have the async
label to use await. In either case, JavaScript processing proceeds to subsequent program
statements, and only comes back when the promise has resolved.

Study sleeper.js.  See if you can predict the order of the console log statements it will
print out.  Then run node sleeper.js .  Were you right about the order of the log statements?
You may need to study the program a bit to understand why it does things in the order it does.

## Part 3: Asynchronous calls to mongoDB

Many of the statements in mongowriter.js may not make sense to you yet.  The thing to
focus on in this program are the asynchronous calls.  These are:  

Item.findOne()  
Item.create()  
Item.findOneAndUpdate()  

The program uses these calls to create two entries in the database, one for apple and one
for banana.  In each case, the program checks to see if the corresponding entry exists.
If not it creates it.  If the item does exist, it updates a counter for that item.  
You can run the program a few times
to see what it does, via the command: node mongowriter.js .  Each of the asynchronous
calls returns a promise, and in each case the promise eventually resolves to the
value of an entry in the database.  Note the try ... catch surrounding the await
statements in createItemWithAwait, and the catch statement at the end of the
chain of then statements in createItemWithThen.  Errors can occur when you
make an asynchronous call, and you have to have error handling.

There is a chain of callbacks, from the first call to
createItemWithThen, to createItem2, to closeDb.  You need that chain so that
things happen in order -- in particular, so both items are created before
the database connection is closed.  Your assignment is to add to that callback chain,
to create or update an item for another fruit.  You would call one of 
the existing functions, createItemWithThen or createItemWithAwait, to
create/update the item.  Your function would have to occur before closeDb in the
callback chain.

Once you have it working, do a git add/commit/push for your branch, submit
a pull request, and use squibby to record the assignment.