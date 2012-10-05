/**
 * View for login form at the end of comments.
 */
Ext.define('Docs.view.auth.Form', {
    extend: 'Ext.container.Container',
    alias: 'widget.authForm',
    requires: [
        'Docs.Tip'
    ],

    html: [
        '<span class="toggleNewComment"><span></span>Sign in to post a comment:</span>',
        '<form class="loginForm">',
            '<input class="username" type="text" name="username" placeholder="Username" />',
            '<input class="password" type="password" name="password" placeholder="Password" />',
            '<label><input type="checkbox" name="remember" /> Remember Me</label>',
            '<input class="submit" type="submit" value="Sign in" />',
            ' or ',
            '<a class="register" href="http://www.sencha.com/forum/register.php" target="_blank">Register</a>',
        '</form>'
    ],

    cls: "new-comment",

    /**
     * @event login
     * Fires when user fills in username and password and presses
     * submit button.
     * @param {Docs.view.auth.CommentForm} form
     * @param {String} username
     * @param {String} password
     * @param {Boolean} remember True when remember-me checked.
     */

    afterRender: function() {
        this.callParent(arguments);

        this.getEl().down("form").on("submit", this.submitLogin, this, {preventDefault: true});
    },

    // Gathers values from form and fires login event.
    submitLogin: function(event, el) {
        var form = Ext.get(el);
        var username = form.down('input[name=username]').getValue();
        var password = form.down('input[name=password]').getValue();
        var rememberEl = form.down('input[name=remember]');

        var remember = rememberEl ? !!(rememberEl.getAttribute('checked')) : false;

        this.fireEvent("login", this, username, password, remember);
    },

    /**
     * Shows the login failure message.
     * @param {String} msg
     */
    showMessage: function(msg) {
        var submitEl = this.getEl().down('input[type=submit]');
        Docs.Tip.show(msg, submitEl, 'bottom');
    }

});
