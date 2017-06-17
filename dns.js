module.exports = function(RED) {
    "use strict";
    var dns = require("dns");

    function DNSNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function (msg) {
            // By default, handle errors and pass results on in payload
            var defaultHandler = function(err, addresses) {
              if(err) {
                node.error(err, msg);
              }
              else {
                node.send({payload: addresses});
              }
            };

            var lookupHandler = function(err, address, family) {
              if(err) {
                node.error(err, msg);
              }
              else {
                node.send({payload: address, family: family});
              }
            };

            // For now, user is responsible for sending the payload as
            // the arguments to the method.
            if(config.method == "lookup") {
              var family = 4;
              if(msg.famiy) {
                family = msg.family;
              }
              dns.lookup(msg.payload, family, lookupHandler);
            }
            else if(config.method == "resolve") {
              var rr_type = 'A';
              if(msg.rr_type) {
                rr_type = msg.rr_type;
              }
              dns.resolve(msg.payload, rr_type, defaultHandler);
            }
            else if(config.method == "resolve4") {
              dns.resolve4(msg.payload, defaultHandler);
            }
            else if(config.method == "resolve6") {
              dns.resolve6(msg.payload, defaultHandler);
            }
            else if(config.method == "resolveMx") {
              dns.resolveMx(msg.payload, defaultHandler);
            }
            else if(config.method == "resolveTxt") {
              dns.resolveTxt(msg.payload, defaultHandler);
            }
            else if(config.method == "resolveSrv") {
              dns.resolveSrv(msg.payload, defaultHandler);
            }
            else if(config.method == "resolveNs") {
              dns.resolveNs(msg.payload, defaultHandler);
            }
            else if(config.method == "resolveCname") {
              dns.resolveCname(msg.payload, defaultHandler);
            }
            else if(config.method == "reverse") {
              dns.reverse(msg.payload, defaultHandler);
            }
            else {
              node.error("Method '" + config.method + "' not implemented yet.");
            };

            return msg;
        });
    }
    RED.nodes.registerType("dns", DNSNode);
};
