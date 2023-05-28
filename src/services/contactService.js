const Contact = require ('../models/Contact')


const contact = async (req,res) => {
  let data = null
    const {name, subject, email, message } = req.body;
  
    try {
      const newContact = new Contact({
        name,
        subject,
        email,
        message
      });
  
      const dataContact = await newContact.save();
      console.log('Contacto guardado:', savedContact);
      res.status(200).json({ mensaje: 'Contacto guardado exitosamente' });
    } catch (error) {
      console.log('Error al guardar el contacto:', error);
      res.status(500).json({ mensaje: 'Ocurrió un error al guardar el contact' });
    }
  } 
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return createContact(false, data, errors.array(), 400)
    // }
  
    // const { name, subject, email, message } = req.body
  
    // const contactExists = await Contact.findById(contactId)
  
    // if (!contactExists) {
    //   return createContact(false, data, USER_ERROR, 400)
    // }
    // body.contact = contactExists._id
    // const createdContact = await Contact.create(name, subject, email, message)
  
    // await Contact.saveContactIntoUser(createdContact, contactExists)
  
  //   data = {
  //     contact: createdContact
  //   }
  
  //   return this.contact(true, data, null, 201)
  // }

  module.exports = { contact }