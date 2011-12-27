/*
 * iptables.js - A seasonal holiday hack by Allan Clark
 * Fork me on github: 
 * http://github.com/ajclark/iptables.js
 *
 */

function generateIPTables() {
	function getRulesetId() {
		return document.getElementById("ruleset");
	}
	
	function evaluateCheckbox(checkboxName, outputText) {
		if (document.form.elements[checkboxName].checked) {
		    var rulesetId = getRulesetId();	
		    rulesetId.appendChild(document.createElement("p"));
		    rulesetId.appendChild(document.createTextNode(outputText));
		}
	}
		
    if (document.form.elements["isRedHat"].checked) {
	    input = "RH-Firewall-1-INPUT";
	    output = "RH-Firewall-1-OUTPUT";
	}
	else {
		input = "INPUT";
		output = "OUTPUT";
	}

    // Make way for the firewall rules
    var rulesetId = getRulesetId();	
	rulesetId.innerHTML="";
	
	cidr = document.form.elements["network"].value;
		
	evaluateCheckbox("loopback", "-A " + input + " -i lo -j ACCEPT");
	evaluateCheckbox("outgoing", "-A " + output + " -o lo -j ACCEPT");
	evaluateCheckbox("tcp_21", "-A " + input + " -p tcp --dport 21 -m state --state NEW -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("tcp_22", "-A " + input + " -p tcp --dport 22 -m state --state NEW -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("tcp_25", "-A " + input + " -p tcp --dport 25 -m state --state NEW -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("tcp_80", "-A " + input + " -p tcp --dport 80 -m state --state NEW -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("tcp_110", "-A " + input + " -p tcp --dport 110 -m state --state NEW -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("udp_123", "-A " + input + " -p udp -m udp --dport 123 -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("udp_67", "-A " + input + " -p udp -m udp --dport 67 -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("udp_53", "-A " + input + " -p udp -m udp --dport 53 -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("icmp_8", " -A " + input + " -p icmp --icmp-type 8 -s " + cidr + " -j ACCEPT");
	evaluateCheckbox("icmp_11", "-A " + input + " -p icmp --icmp-type 11 -s " + cidr + " -j ACCEPT");
	
	return false;
}