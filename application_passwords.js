if (window.rcmail) {
  rcmail.addEventListener('init', function(evt) {
    var tab = $('<span>').attr('id', 'settingstabpluginapplication_passwords').addClass('tablink filter');
    var button = $('<a>').attr('href', rcmail.env.comm_path+'&_action=plugin.application_passwords').html(rcmail.gettext('application_passwords', 'application_passwords')).appendTo(tab);
    rcmail.add_element(tab, 'tabs');
    rcmail.register_command('plugin.application_passwords-save', function() {
      var input_new_application_name = rcube_find_object('new_application_name');
      if (input_new_application_name && input_new_application_name.value=='') {
          alert(rcmail.gettext('noaddressfilled', 'application_name'));
          input_new_application_name.focus();
      } else {
          rcmail.gui_objects.new_application_form.submit();
      }
    }, true);
  })
}
