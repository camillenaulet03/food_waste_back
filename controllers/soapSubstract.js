const soapRequest = require('easy-soap-request');
const fs = require('fs');
const xml2js = require('xml2js');

exports.substract = (req, res, next) => {
    if(isNaN(req.body.number1) && isNaN(req.body.number2) && req.body.number1 !== '' && req.body.number2 !== '') {
        const url = 'http://www.dneonline.com/calculator.asmx';
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': 'http://tempuri.org/Subtract',
        };
        const xml = `<?xml version="1.0" encoding="" ?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                            <Subtract xmlns="http://tempuri.org/">
                                <intA>${req.body.number1}</intA>
                                <intB>${req.body.number2}</intB>
                            </Subtract>
                        </soap:Body>
                    </soap:Envelope>`;
        (async () => {
            const {response} = await soapRequest({url: url, headers: headers, xml: xml, timeout: 1000});
            const parser = new xml2js.Parser();
            parser.parseString(response.body, function (err, result) {
                if (err) res.status(404).json({message: err})
                res.status(200).json(result['soap:Envelope']['soap:Body'][0]['SubtractResponse'][0]['SubtractResult'][0]);
            });
        })();
    } else res.status(404).json({message: "Not number"})
}
