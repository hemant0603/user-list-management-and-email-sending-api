const fs = require('fs');
const csv = require('csv-parser');
const User = require('../Models/User');
const List = require('../Models/List');

const addUsers = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).send({ message: 'List not found' });
    }

    const userData = [];
    const errors = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => userData.push(data))
      .on('end', async () => {
        for (const row of userData) {
          const user = {
            listId,
            name: row.name,
            email: row.email,
            properties: {},
          };

          
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            errors.push({ user, error: 'Duplicate email' });
            continue; 
          }

          if (Array.isArray(list.properties)) {
            for (const prop of list.properties) {
              user.properties[prop.title] = row[prop.title] || prop.fallback;
            }
          }

          try {
            const newUser = new User(user);
            await newUser.save();
          } catch (error) {
            errors.push({ user, error: error.message });
          }
        }

        fs.unlinkSync(req.file.path);

        res.status(200).send({
          added: userData.length - errors.length, 
          failed: errors.length,
          total: await User.countDocuments({ listId }),
          errors,
        });
      });
  } catch (error) {
    res.status(500).send({ message: 'Error processing CSV', error });
  }
};

module.exports = addUsers;
