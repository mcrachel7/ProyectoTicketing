const { Router } = require('express');
const { Types } = require('mongoose');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const mongoose = require('mongoose');

const Ticket = require('../models/ticket');
const User = require('../models/user');
const router = Router();
const verifyToken = require('../routes/index');

router.get('/data-dashboard', verifyToken, async (req, res) => {

  console.log("\t\t[GET] Front llego al back [TICKETS / data-dashboard]. ¡Un saludo!");

  try {

    const monthMap = [
      'Enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const allTickets = await Ticket.find().count();
    const allClosedTickets = await Ticket.find({status: {$in : ['Closed', 'Cerrado']}}).count();
    const allUsers = await User.find().count();
    const allUsersWithTicket = await Ticket.aggregate([
      {
        $group: {
          _id: "$id_user",
          count: { $sum: 1 }
        }
      }
    ]).exec();  

    const percentilClosedTickets = await ( (allClosedTickets*100)/allTickets);
    const percentilUsersWithTickets = await ( (allUsersWithTicket.length*100)/allUsers);

    let objResponse = {
      cantTickets: allTickets,
      percentilTicketsCreatedByUsers: percentilUsersWithTickets,
      percentilClosedTickets: percentilClosedTickets,
      dataChart: []
    };

    for(let i=0; i<monthMap.length; i++){

      const ticketscreatedByMonth = await Ticket.find({
        $expr: {
          $eq: [{ $month: { $toDate: '$createdAt' } }, (i+1) ] // Convierte el campo createdAt a tipo fecha y compara el mes
        }
      }).count();

      objResponse.dataChart.push({
        nameMonth: monthMap[i],
        cantTickets: ticketscreatedByMonth
      });

    }    
    console.log(objResponse);
    res.status(200).send(objResponse);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }

});

router.get('/view-ticket', verifyToken, async (req, res) =>{

  console.log("\t\t[GET] Front llego al back [TICKETS / view-ticket]. ¡Un saludo!");

  const id = req.query.idUser;
  const allTickets = await Ticket.find({ id_user: id }).lean();

  if(!allTickets){
      return res.status(404).send('Id user does not exist');
  }
  res.status(201).send(allTickets);
});

router.post('/new-ticket', verifyToken, async (req, res) =>{

  console.log("\t\t[POST] Front llego al back [TICKETS / new-ticket]. ¡Un saludo!");

  Ticket.init();
  const { idUser, title, description, status, type, fullName, department, createdAt } = req.body;
  console.log({ idUser, title, description, status, type, fullName, department, createdAt });
  const ticket = new Ticket({
      _id: new Types.ObjectId(),
      title: title,
      description: description,
      status: status,
      type: type,
      id_user: idUser,
      fullName: fullName,
      department: department,
      createdAt:createdAt
  });


  await ticket.save();
  const token = jwt.sign({id: ticket._id}, config.secret);
  res.json({auth: true, token});

});

router.get('/list-tickets', verifyToken, async(req, res) =>{

  console.log("\t\t[GET] Front llego al back [TICKETS / list-tickets]. ¡Un saludo!");
  try {
    const tickets = await Ticket.find();
    res.json(tickets)
  } catch (error) {
    console.log.apply(error);
    res.status(500).send('Hubo un error');
  }

})

router.put('/editTicket/:id', verifyToken, async(req, res)=>{

  console.log("\t\t[PUT] Front llego al back [TICKETS / edit-tickets]. ¡Un saludo!");
  try {
    const { status } = req.body;
    let ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        res.status(404).json({ msg: 'No existe el ticket' })
    }
    ticket.status = status;
    ticket = await Ticket.findOneAndUpdate({ _id: req.params.id },ticket, { new: true} )
    res.json(ticket);

} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}
})

router.get('/obtainTicket/:id', verifyToken, async(req, res)=>{

  console.log("\t\t[GET] Front llego al back [TICKETS / obtainTicket]. ¡Un saludo!");
  try {
    let ticket = await Ticket.findById(req.params.id);

    if(!ticket) {
        res.status(404).json({ msg: 'No existe el ticket' })
    }

    res.json(ticket);

} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}
})

module.exports = router;
