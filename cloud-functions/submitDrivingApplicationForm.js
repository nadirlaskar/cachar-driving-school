/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const nodemailer = require('nodemailer');
const uuid = () =>  Math.floor(Math.random() * 1000000000);

var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = (path) => new Promise(function(resolve,reject) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           reject(err); 
           throw err;
            
        }
        else {
            resolve(html);
        }
    });
});

exports.sendEmail = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return corsEnabledFunction(req,res);
  }else if(req.method === 'POST'){
    let payload = req.body || 'Invalid form submitted';
    let formSubmitId = uuid('v4');
    try{
      const response = await submitForm(payload,formSubmitId);
      res.status(200).send(JSON.stringify({formSubmitId}));
    }catch(err){
      res.status(500).send(err);
    }
  }else{
     res.status(500).send('Not Supported');
  }
};

const submitForm = async (payload, formSubmitId)=>{
  const { address_proof, id_proof, payment_receipt, name, course,...rest } = payload;
  const tanspoter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net', 
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
      user: process.env.EMAIL_USERNAME || "applicant@cachardrivingschool.com", 
      pass: process.env.EMAIL_PASSWORD || "0by0@Infinity"
    }
  });
  var html = await readHTMLFile(__dirname + '/form-submit.html');
  var template = handlebars.compile(html);
  var replacements = {
      name,
      course,
      formSubmitId,
      ...rest
  };
  var htmlToSend = template(replacements);
  const response = await tanspoter.sendMail({       
      from: `applicant@cachardrivingschool.com`,
      to: 'nadirlaskar@gmail.com',
      subject: `${name} - ${course}`,
      html: htmlToSend,
      attachments: [
      {
        filename: ``,
        content: address_proof.content,
        encoding: 'base64',
      },
      {
        filename: id_proof.name,
        content: id_proof.content,
        encoding: 'base64',
      },
      {
        filename: payment_receipt.name,
        content: payment_receipt.content,
        encoding: 'base64',
      },
    ],
  })
  return response;
}
// const payload = require('./payload.json')
// exports.submitForm = () => submitForm(payload,uuid('v4'));

/**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
const corsEnabledFunction = (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.send('Hello World!');
  }
};