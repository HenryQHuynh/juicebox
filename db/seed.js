// inside db/seed.js

// grab our client with destructuring from the export in index.js
// const { client } = require('./index');
const {
    client,
    getAllUsers,
    createUser,
    updateUser,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser
} = require('./index');

// async function testDB() {
//   try {
//     // connect the client to the database, finally
//     client.connect();

//     // queries are promises, so we can await them
//     const result = await client.query(`SELECT * FROM users;`);

//     // for now, logging is a fine way to see what's up
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     // it's important to close out the client connection
//     client.end();
//   }
// }

// async function testDB() {
//     try {
//       client.connect();

//       const { rows } = await client.query(`SELECT * FROM users;`);
//       console.log(rows);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       client.end();
//     }
//   }

// async function testDB() {
//     try {
//         client.connect();

//         const users = await getAllUsers();
//         console.log(users);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         client.end();
//     }
// }

// testDB();

// this function should call a query which drops all tables from our database

async function dropTables() {
    try {
        console.log("Starting to drop tables...");

        //Make sure the drop order is correct and have posts prior to users per the instructions
        await client.query(`
        DROP TABLE IF EXISTS posts;  
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS tags;        
      `);

        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!");
        throw error;
    }
}

// this function should call a query which creates all tables for our database 
async function createTables() {
    try {
        console.log("Starting to build tables...");

        await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true
        );
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          title varchar(255) NOT NULL,
          content TEXT NOT NULL,
          active BOOLEAN DEFAULT true
        );
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE post_tags (
          "postId" INTEGER REFERENCES posts(id),
          "tagId" INTEGER REFERENCES tags(Id),
          UNIQUE ("postId", "tagId")
          );
      `);

        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error;
    }
}

// new function, should attempt to create a few users
// async function createInitialUsers() {
//     const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });
//     try {
//         console.log("Starting to create users...");

//         const albert = await createUser({ username: 'albert', password: 'bertie99' });

//         console.log(albert);

//         console.log("Finished creating users!");
//     } catch (error) {
//         console.error("Error creating users!");
//         throw error;
//     }
// }

async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        await createUser({
            username: 'albert',
            password: 'bertie99',
            name: 'Al Bert',
            location: 'Sidney, Australia'
        });
        await createUser({
            username: 'sandra',
            password: '2sandy4me',
            name: 'Just Sandra',
            location: 'Ain\'t tellin\''
        });
        await createUser({
            username: 'glamgal',
            password: 'soglam',
            name: 'Joshua',
            location: 'Upper East Side'
        });

        console.log("Finished creating users!");
    } catch (error) {
        console.error("Error creating users!");
        throw error;
    }
}

async function createInitialPosts() {
    try {
        const [albert, sandra, glamgal] = await getAllUsers();

        console.log("Starting to create posts...");
        await createPost({
            authorId: albert.id,
            title: "First Post",
            content: "This is my first post. I hope I love writing blogs as much as I love writing them."
        });

        await createPost({
            authorId: sandra.id,
            title: "Back in my day we wrote code on graph sheets",
            content: "Seriously, how does this mumbo jumbo even work. You young whipper snappers."
        });

        await createPost({
            authorId: glamgal.id,
            title: "My Dress-up Darling is a cute Rom-Com!",
            content: "It is a simple rom-com/slice-of-life between two characters exploring their interests in their hobbies. They just happen to find different ways for the male MC to express his talents!"
        });

        console.log("Finished creating posts!");
  } catch (error) {
    console.log("Error creating posts!");
    throw error;
  }
}

// then modify rebuildDB to call our new function
async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialPosts();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }

  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);
  
      console.log("Calling updateUser on users[0]");
      const updateUserResult = await updateUser(users[0].id, {
        name: "Newname Sogood",
        location: "Lesterville, KY"
      });
      console.log("Result:", updateUserResult);
  
      console.log("Calling getAllPosts");
      const posts = await getAllPosts();
      console.log("Result:", posts);
  
      console.log("Calling updatePost on posts[0]");
      const updatePostResult = await updatePost(posts[0].id, {
        title: "New Title",
        content: "Updated Content"
      });
      console.log("Result:", updatePostResult);
  
      console.log("Calling getUserById with 1");
      const albert = await getUserById(1);
      console.log("Result:", albert);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.log("Error during testDB");
      throw error;
    }
  }
  
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());