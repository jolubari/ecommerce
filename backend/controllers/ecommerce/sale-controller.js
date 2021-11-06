"use-strict";

// lanzar npm install handlebars nodemailer nodemailer-smtp-transport ejs      PARA INSTALAR PAQUETES NECESARIOS
//handlebars -> Generar html a partir de objetos json
//nodemailer -> Envio de correos
//nodemailer-smtp-transport -> Medio de transporte para envio de correos
//ejs -> Motor de plantillas para nodeJS

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');



var sale = require("../../models/sale-model");
var saleDetails = require("../../models/sale-details-model");
var product = require("../../models/product-model");
var cart = require('../../models/cart-model');
var coupon = require("../../models/coupon-model");



const registerSaleClient = async(request, response) => {
    if (request.user) {
        var data = request.body;
        var details = data.details;

        var lastSale = await sale.find().sort({ createdAt: -1 }); // obtenemos la ultima venta
        var serialNumber;
        var correlative;
        var saleNumber;

        if (lastSale.length == 0) { // primer registro de la coleccion
            serialNumber = '001';
            correlative = '000001';
            saleNumber = serialNumber + '-' + correlative;
        } else {
            // >= 1 registro en coleccion venta
            var lastSaleNumber = lastSale[0].sale_number;
            var listNumberSales = lastSaleNumber.split('-');
            if (listNumberSales[1] != '999999') {
                var newCorrelative = zfill(parseInt(listNumberSales[1]) + 1, 6); // ancho 6
                saleNumber = listNumberSales[0] + '-' + newCorrelative;
            } else if (listNumberSales[1] == '999999') {
                var newSerialNumber = zfill(parseInt(listNumberSales[0]) + 1, 3); // ancho 3
                saleNumber = newSerialNumber + '-000001';
            }
        }

        data.sale_number = saleNumber;
        data.state = 'Procesando';


        // registramos la venta
        var newSale = await sale.create(data);
        // registramos uno a uno los detalles de la venta
        details.forEach(async detail => {
            detail.sale = newSale._id;
            console.log(detail);
            await saleDetails.create(detail);
            // rebajamos el stock del producto
            var elementProduct = await product.findById({ _id: detail.product });
            var newStock = elementProduct.stock - detail.quantity;

            await product.findByIdAndUpdate({ _id: detail.product }, { stock: newStock });

            await cart.remove({ client: data.client }); // limpiar el carrito
        });

        response.status(200).send({ sale: newSale });

    } else {
        response.status(500).send({ message: "Not Access" });
    }
};




function zfill(number, width) { // rellena de ceros una cadena
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";

    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString());
        }

    }
}

const sendMailSaleClient = async(request, response) => {
    var id = request.params['id'];

    //OBTENER ACCESOS DE CUENTA CORREO EMISOR

    /* 
    1. Verificacion en dos pasos: https://www.google.com/landing/2step/
    2. Acceso y Seguridad / Permitir el acceso de aplicaciones menos seguras
    3. Autorizacion: https://security.google.com/settings/security/apppasswords 
    */
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        });
    };
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'joseluis.barba.r@gmail.com',
            pass: 'gemita.,321'
        }
    }));


    var Sale = await sale.findById({ _id: id }).populate('client');
    var Details = await saleDetails.find({ sale: id }).populate('product');
    // Datos a enviar: cliente, _id, fecha, data y subtotal
    var clientSale = Sale.client.first_name + ' ' + Sale.client.second_name + ' ' + Sale.client.first_surname + ' ' + Sale.client.second_surname;
    var idSale = Sale._id;
    var dateSale = new Date(Sale.createdAt);
    var dataSale = Details;
    var subtotalSale = Sale.subtotal;
    var shipmentpriceSale = Sale.shipment_price;

    readHTMLFile(process.cwd() + '/mail.html', (err, html) => {

        let rest_html = ejs.render(html, { data: dataSale, cliente: clientSale, _id: idSale, fecha: dateSale, subtotal: subtotalSale, shipment_price: shipmentpriceSale }); // aqui se renderiza la plantilla mail.html con los datos

        var template = handlebars.compile(rest_html);
        var htmlToSend = template({ op: true });

        var mailOptions = {
            from: 'joseluis.barba.r@gmail.com',
            to: Sale.client.email,
            subject: 'Gracias por tu compra, Ecommerce',
            html: htmlToSend
        };
        response.status(200).send({ data: true });
        transporter.sendMail(mailOptions, function(error, info) {
            console.log(error);
            if (!error) {
                console.log('Email sent: ' + info.response);
            }
        });

    });
};


const validateCoupon = async(request, response) => {
    if (request.user) {
        var userCoupon = request.params['coupon'];

        var data = await coupon.findOne({ code: userCoupon });
        // comprobar que no ha llegado al limite de cupones usados en el cupon que el usuario intenta utilizar
        if (data) {
            if (data.limit == 0) {
                response.status(200).send({ data: undefined });
            } else {
                response.status(200).send({ data: data });
            }
        } else {
            response.status(200).send({ data: undefined });
        }

    } else {
        response.status(500).send({ message: "Not Access" });
    }
};

module.exports = {
    registerSaleClient: registerSaleClient,
    sendMailSaleClient: sendMailSaleClient,
    validateCoupon: validateCoupon
};