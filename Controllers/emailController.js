const nodemailer = require('nodemailer');
const User = require('../Models/User');
const List = require('../Models/List');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'filiberto6@ethereal.email',
        pass: '6sEce8WRE8rVXxX91j'
    }
});


const sendEmail = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }

        const users = await User.find({ listId, subscribed: true });

        for (const user of users) {
            let emailBody = `
                Hey ${user.name}!\n\n
                Thank you for signing up with your email ${user.email}. We have received your city as ${user.properties.city}.\n\n
                Team MathonGo.\n
            `;

           
            const unsubscribeLink = `http://localhost:2000/users/unsubscribe/${user._id}`;

            emailBody += `\n\nIf you wish to unsubscribe, click <a href="${unsubscribeLink}">here</a>.`;

          
            await transporter.sendMail({
                from: 'filiberto6@ethereal.email',
                to: user.email,
                subject,
                text: emailBody
            });
        }

        res.status(200).send({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending emails', error });
    }
};


const unsubscribeUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.subscribed = false;
        await user.save();

        res.status(200).send({ message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error unsubscribing', error });
    }
};

module.exports = { sendEmail, unsubscribeUser };
