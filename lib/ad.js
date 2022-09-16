const Ldap = require('lderp');
const util = require('util');

function AdLdap(host, options) {
    options = options || {};
    Ldap.call(this, host, options);
    this.name = 'ad';
//    this.defaultAttributes = ['accountExpires', 'adminCount', 'badPasswordTime', 'badPwdCount', 'cn', 'codePage', 'countryCode', 'displayName', 'distinguishedName',
//        'dSCorePropagationData', 'dSCorePropagationData', 'givenName', 'homeDirectory', 'homeDrive', 'initials', 'instanceType', 'lastLogoff', 'lastLogon',
//        'lastLogonTimestamp', 'logonCount', 'mail', 'memberOf', 'msDS-SupportedEncryptionTypes', 'name', 'objectCategory', 'objectClass', 'primaryGroupID',
//        'pwdLastSet', 'sAMAccountName', 'sAMAccountType', 'sn', 'userAccountControl', 'userPrincipalName', 'uSNChanged', 'uSNCreated', 'whenChanged',
//        'whenCreated', 'objectGUID', 'objectSid'];
    this.usernameAttribute = options.usernameAttribute || 'sAMAccountName';
    this.zombieUsername = options.zombieUsername || '';
    this.zombiePassword = options.zombiePassword || '';
}

util.inherits(AdLdap, Ldap);

AdLdap.prototype.bindAsZombie = function (zombieUsername, zombiePassword) {
    return Ldap.prototype.bindAsUser.call(this, this.buildDn(zombieUsername || this.zombieUsername), zombiePassword || this.zombiePassword);
};

AdLdap.prototype.buildDn = function (samAccountName) {
    return 'AD\\' + samAccountName;
};

AdLdap.prototype.buildObjectClass = function () {
    return [
        'user',
        'organizationalPerson',
        'person',
        'top'
    ];
};

module.exports = AdLdap;
