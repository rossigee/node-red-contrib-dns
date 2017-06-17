module.exports = function(RED) {
    "use strict";
    var dns = require("dns");

    function DNSNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', function (msg) {
            // By default, handle errors and pass results on in payload
            var defaultHandler = function(err, res) {
              if(err) {
                node.error(err, msg);
              }
              else {
                node.send({payload: res});
              }
            };

            // For now, user is responsible for sending the payload as
            // the arguments to the method.
            if(config.method == "lookup") {
              var family = 4;

              dns.lookup(msg.payload, family, defaultHandler);
            }
            else {
              node.error("Method '" + config.method + "' not implemented yet.");
            };

            return msg;
        });
    }
    RED.nodes.registerType("dns", DNSNode);
};
