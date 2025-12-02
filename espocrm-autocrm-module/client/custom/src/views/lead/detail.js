Espo.define('custom:views/lead/detail', 'views/detail', function (Dep) {
    
    return Dep.extend({
        
        setup: function () {
            Dep.prototype.setup.call(this);
        },
        
        actionFindContacts: function () {
            var email = this.model.get('emailAddress');
            
            if (!email) {
                Espo.Ui.warning('This lead has no email address');
                return;
            }

            Espo.Ui.notify('Searching...');

            var self = this;

            Espo.Ajax.getRequest('Contact', {
                where: [
                    {
                        type: 'equals',
                        attribute: 'emailAddress',
                        value: email
                    }
                ]
            }).then(function(data) {
                Espo.Ui.notify(false);
                
                if (!data || !data.list || data.list.length === 0) {
                    Espo.Ui.warning('No contacts found with email: ' + email);
                    return;
                }

                var names = [];
                data.list.forEach(function(contact) {
                    var firstName = contact.firstName || '';
                    var lastName = contact.lastName || '';
                    names.push(firstName + ' ' + lastName);
                });

                alert('Found contacts:\n' + names.join('\n'));
            }).catch(function(error) {
                Espo.Ui.notify(false);
                Espo.Ui.error('Error searching contacts');
                console.error(error);
            });
        }
        
    });
});
