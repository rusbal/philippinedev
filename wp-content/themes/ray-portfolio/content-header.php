<?php

	/*
		Template for the entry header
	*/

	$video_code = portfolio_video_code();

?>
<?php if(
	!is_singular() || 
	(
		is_singular() && 
		(
			get_theme_mod('portfolio_post_show_featured_image', '1') == '1' || 
			get_theme_mod('portfolio_post_show_title', '1') == '1'
		)
	)
) : ?>
<header class="entry-header<?php if(is_singular() && is_sticky()) :?> sticky<?php endif; ?><?php if(get_theme_mod('portfolio_full_width_images', '1') == '1') : ?> full-width-image<?php endif; ?><?php if(get_theme_mod('portfolio_post_show_title', '1') == '0') : ?> no-title<?php endif; ?>" data-url="<?php echo get_permalink(); ?>">
	<?php if(!is_singular() || get_theme_mod('portfolio_post_show_featured_image', '1') == '1') : ?>
		<?php if (has_post_thumbnail() && !post_password_required()) : ?>			
			<?php
            if (is_home()):
                the_post_thumbnail(is_singular() ? 'full' : 'gk-portfolio-size');
            else:
                if( class_exists('Dynamic_Featured_Image') ) {
                    global $dynamic_featured_image;
                    $featured_images = $dynamic_featured_image->get_featured_images();

                    if (wp_check_filetype($featured_images[0]['full'])['type'] == 'image/png') {
                        echo '<img src="' . $featured_images[0]['full'] . '">';
                    } else {
                        echo wp_get_attachment_image($featured_images[0]['attachment_id'], 'width-1260');
                    }

                }
            endif;
            ?>
        <?php elseif($video_code) : ?>
			<div class="video-wrapper">
				<?php echo $video_code; ?>
			</div>
		<?php endif; ?>
	<?php endif; ?>

	<?php if(get_theme_mod('portfolio_post_show_title', '1') == '1') : ?>
	<h<?php echo is_single() ? '1' : '2'; ?> class="entry-title">
		<?php if(!is_singular()) : ?>
		<a href="<?php the_permalink(); ?>" rel="bookmark">
		<?php endif; ?>
			<?php the_title(); ?>
		<?php if(!is_singular()) : ?>
		</a>
		<?php endif; ?>
	</h<?php echo is_single() ? '1' : '2'; ?>>
	<?php endif; ?>
</header><!-- .entry-header -->
<?php endif; 