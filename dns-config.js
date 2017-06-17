module.exports = function(RED) {
    function NiceRoute53Config(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.aws_access_key = n.aws_access_key;
        this.aws_secret_key = n.aws_secret_key;
    }
    RED.nodes.registerType("nice-route53-config", NiceRoute53Config);
};
