"use-strict";

var path = require('path');



var sale = require("../../models/sale-model");

const getMonthlyEarningsKPI = async(request, response) => {
    if (request.user && request.user.role === 'admin') {
        // un array por cada mes
        var january = 0;
        var february = 0;
        var march = 0;
        var april = 0;
        var may = 0;
        var june = 0;
        var july = 0;
        var august = 0;
        var september = 0;
        var october = 0;
        var november = 0;
        var december = 0;
        //totales
        var totalEarningYear = 0;
        var totalEarningMonth = 0;
        var countSales = 0;
        var totalLastMonth = 0;


        var sales = await sale.find();

        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;


        sales.forEach(item => {
            var yearSale = new Date(item.createdAt).getFullYear();
            var monthSale = new Date(item.createdAt).getMonth() + 1;
            if (currentYear == yearSale) {
                //total ganacia del año:
                totalEarningYear += item.subtotal;
                // total ganancias del mes:
                if (monthSale == currentMonth) {
                    totalEarningMonth += item.subtotal;
                    countSales += 1;
                }

                if (monthSale == currentMonth - 1) {
                    totalLastMonth += item.subtotal;
                }
                // total en € de ventas de cada mes
                switch (monthSale) {
                    case 1:
                        january = january + item.subtotal;
                        break;
                    case 2:
                        february = february + item.subtotal;
                        break;
                    case 3:
                        march = march + item.subtotal;
                        break;
                    case 4:
                        april = april + item.subtotal;
                        break;
                    case 5:
                        may = may + item.subtotal;
                        break;
                    case 6:
                        june = june + item.subtotal;
                        break;
                    case 7:
                        july = july + item.subtotal;
                        break;
                    case 8:
                        august = august + item.subtotal;
                        break;
                    case 9:
                        september = september + item.subtotal;
                        break;
                    case 10:
                        october = october + item.subtotal;
                        break;
                    case 11:
                        november = november + item.subtotal;
                        break;
                    case 12:
                        december = december + item.subtotal;
                        break;
                    default:
                        break;
                }
            }

            response.status(200).send({
                january: january,
                february: february,
                march: march,
                april: april,
                may: may,
                june: june,
                july: july,
                august: august,
                september: september,
                october: october,
                november: november,
                december: december,
                totalEarningYear: totalEarningYear,
                totalEarningMonth: totalEarningMonth,
                countSales: countSales,
                totalLastMonth: totalLastMonth
            });
        });
    } else {
        response.status(500).send({ message: "Not Access" });
    }
};


module.exports = {
    getMonthlyEarningsKPI: getMonthlyEarningsKPI,
};