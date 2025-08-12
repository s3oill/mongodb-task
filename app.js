const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbname = 'testdb'

mongoClient.connect(connectionUrl, (error, res1) => {
  if (error) return console.log('Unable to connect to MongoDB', error)
  console.log('Connected successfully to MongoDB')

  const db = res1.db(dbname)
  const users = db.collection('users')

  // (1) Insert one document
  users.insertOne({ name: 'sohaf', age: 30 }, (e1, r1) => {
    if (e1) return console.log('Unable to insert data (sohaf)')
    console.log(r1.insertedId)

    users.insertOne({ name: 'majeed', age: 30 }, (e2, r2) => {
      if (e2) return console.log('Unable to insert data (majeed)')
      console.log(r2.insertedId)

      // (2) Insert many documents (5 of them have age = 27)
      users.insertMany([
        { name: 'relam',  age: 30 },
        { name: 'refal',  age: 30 },
        { name: 'nora',   age: 27 },
        { name: 'sara',   age: 27 },
        { name: 'islam',  age: 27 },
        { name: 'ahmad',  age: 27 },
        { name: 'ali',    age: 27 },
        { name: 'khalid', age: 25 },
        { name: 'lili',   age: 22 },
        { name: 'amjad',  age: 35 }
      ], (e3, r3) => {
        if (e3) return console.log('Unable to insert many')

        // (3) Show all users with age = 27
        users.find({ age: 27 }).toArray((e4, data4) => {
          if (e4) return console.log('Error finding age=27')
          console.log('All users with age = 27:', data4)

          // (4) Show only the first 3 users with age = 27
          users.find({ age: 27 }).limit(3).toArray((e5, data5) => {
            if (e5) return console.log('Error getting first 3 age=27')
            console.log('First 3 users with age = 27:', data5)

            // (5) & (6) Update only the first 4 users with age = 27
            users.find({ age: 27 }).limit(4).toArray((e6, data6) => {

              // (5) Change the name of the first 4 users to "Updated Name"
              users.updateOne({ _id: data6[0]._id }, { $set: { name: 'Updated Name' } }, () => {
                users.updateOne({ _id: data6[1]._id }, { $set: { name: 'Updated Name' } }, () => {
                  users.updateOne({ _id: data6[2]._id }, { $set: { name: 'Updated Name' } }, () => {
                    users.updateOne({ _id: data6[3]._id }, { $set: { name: 'Updated Name' } }, () => {
                      console.log('Name updated for first 4 users with age = 27')

                      // (6) Increase the age of the first 4 users by +4
                      users.updateOne({ _id: data6[0]._id }, { $inc: { age: 4 } }, () => {
                        users.updateOne({ _id: data6[1]._id }, { $inc: { age: 4 } }, () => {
                          users.updateOne({ _id: data6[2]._id }, { $inc: { age: 4 } }, () => {
                            users.updateOne({ _id: data6[3]._id }, { $inc: { age: 4 } }, () => {
                              console.log('Age increased by +4 for first 4 users with age = 27')


                                  // (7) Increase age by +10 for all users
                                  users.updateMany(
                                    {},
                                    { $inc: { age: 10 } },
                                    (e9, r9) => {
                                      if (e9) return console.log('Error increasing age +10 for all')
                                   console.log('Age +10 for all users:', r9.modifiedCount)

                                    // (8) Delete all users with age = 41
                                    // (9) Display the number of deleted document 
                                  users.deleteMany(
                                    { age: 41 },
                                    (e10, r10) => {
                                      if (e10) return console.log('Error deleting age=41')
                                      console.log('Deleted users with age = 41:', r10.deletedCount)

                                    }
                                  )
                                }
                              )
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
