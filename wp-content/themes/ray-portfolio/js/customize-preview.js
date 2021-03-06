(function($){
	wp.customize('portfolio_primary_color', function(value) {
	    value.bind( function( to ) {
	    	to = to ? to : '#5cc1a9';
	    	// set colors:
	    	var new_css = 'a, a.inverse:active, a.inverse:focus, a.inverse:hover, .entry-title a:hover, button, input[type="submit"], input[type="button"], input[type="reset"], .entry-summary .readon, .comment-author .fn, .comment-author .url, .comment-reply-link, .comment-reply-login, #content .tags-links a:active, #content .tags-links a:focus, #content .tags-links a:hover, .nav-menu li a:active, .nav-menu li a:focus, .nav-menu li a:hover, ul.nav-menu ul a:hover, .nav-menu ul ul a:hover, .gk-social-buttons a:hover:before, .format-gallery .entry-content .page-links a:hover, .format-audio .entry-content .page-links a:hover, .format-status .entry-content .page-links a:hover, .format-video .entry-content .page-links a:hover, .format-chat .entry-content .page-links a:hover, .format-quote .entry-content .page-links a:hover, .page-links a:hover, .paging-navigation a:active, .paging-navigation a:focus, .paging-navigation a:hover, .comment-meta a:hover, .social-menu li:hover:before, .social-menu-topbar li:hover:before { color: '+to+'; } button, input[type="submit"], input[type="button"], input[type="reset"], .entry-summary .readon { border: 1px solid '+to+'; } body .nav-menu .current_page_item > a, body .nav-menu .current_page_ancestor > a, body .nav-menu .current-menu-item > a, body .nav-menu .current-menu-ancestor > a { border-color: '+to+'; color: '+to+'!important; } .format-status .entry-content .page-links a, .format-gallery .entry-content .page-links a, .format-chat .entry-content .page-links a, .format-quote .entry-content .page-links a, .page-links a { background-color: '+to+'; border-color: '+to+'; } .hentry .mejs-controls .mejs-time-rail .mejs-time-current, .comment-post-author {background: '+to+';} .comments-title > span, .comment-reply-title > span { border-bottom-color: '+to+'; }.hentry .mejs-controls .mejs-time-rail .mejs-time-current, .comment-post-author, .sticky .post-preview:after, .entry-header.sticky:after, .article-helper.sticky:after, #prev-post > a:hover, #next-post > a:hover { background: '+to+'; }';
	    	
	    	if($(document).find('#portfolio-new-css-1').length) {
	    		$(document).find('#portfolio-new-css-1').remove();
	    	}
	    	
	    	$(document).find('head').append($('<style id="portfolio-new-css-1">' + new_css + '</style>'));
	    });
	});
	
	wp.customize('background_color', function(value) {
	    value.bind( function( to ) {
	    	to = to ? to : '#000000';
	    	// set colors:
	    	var new_css = 'body.custom-background #main {background: '+to+';}';
	    	if($(document).find('#portfolio-new-css-2').length) {
	    		$(document).find('#portfolio-new-css-2').remove();
	    	}
	    	
	    	$(document).find('head').append($('<style id="portfolio-new-css-2">' + new_css + '</style>'));
	    });
	});
	
	wp.customize('blogname', function(value) {
		value.bind( function( to ) {
			$('.site-title').text(to);
		});
	});
	
	wp.customize('blogdescription', function(value) {
		value.bind( function( to ) {
			$('.site-description').text(to);
		});
	});
})(jQuery);